export const runtime = "nodejs";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// MongoDB client
const client = new MongoClient(process.env.MONGODB_URI);
let usersCollection;

async function getUsersCollection() {
  if (!usersCollection) {
    await client.connect();
    usersCollection = client.db("mydatabase").collection("users");
  }
  return usersCollection;
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
        const { email, password } = credentials;

        // Hardcoded user (or replace with MongoDB later)
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
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
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
    signIn: "/login", // redirect all NextAuth signIns to /login
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
