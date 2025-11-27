export const runtime = "nodejs";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// Lazy-load MongoDB connection at runtime
async function getUsersCollection() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db("mydatabase").collection("users");
}

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          // Hardcoded user for testing
          const user = {
            id: "1",
            name: "Test User",
            email: "test@gmail.com",
            password: bcrypt.hashSync("123456", 10),
          };

          if (email !== user.email) return null;

          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) return null;

          return user;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "google") {
          const collection = await getUsersCollection();
          const existingUser = await collection.findOne({ email: user.email });
          if (!existingUser) {
            await collection.insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              createdAt: new Date(),
            });
          }
        }
        return true;
      } catch (err) {
        console.error("SignIn callback error:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
