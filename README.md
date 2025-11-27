# 🛒 Gadget Store – Next.js Frontend

A modern and responsive **Gadget Store** frontend built with **Next.js**.  
The app fetches products, categories, and related data from a **separate backend API** and displays them in a clean, user-friendly interface.

---

## ⚡ Features

- Fully static Next.js frontend (API calls to external backend)
- Product listing & product details
- Add product form (UI only)
- Responsive modern UI
- Clean component structure
- Easy Netlify deployment

---

## 🛠 Setup & Installation

### 1. Clone the project

git clone YOUR_REPO_URL
cd gadget-store-frontend
2. Install dependencies

Copy code
npm install
3. Environment variables
Create a .env.local file:

ini
Copy code
NEXT_PUBLIC_API_URL=https://your-backend-api.com
4. Run in development

Copy code
npm run dev
Open your browser at:

arduino
Copy code
http://localhost:3000
5. Create production build

Copy code
npm run build
6. Deploy
Netlify automatically reads:

netlify.toml

Build command: npm run build

Publish: .next

Uses @netlify/plugin-nextjs

Just connect your GitHub repo → “New project from Git” → Deploy.

📁 Route Summary
Route	Type	Description
/	Page	Homepage with featured gadgets
/products	Page	List of all gadgets from backend API
/products/[id]	Dynamic Page	Single product details
/add	Page	Add Product form (UI only, posts to backend manually later)
/login	Page	Login UI
/register	Page	Register UI
/about	Page	About the store
/contact	Page	Contact page

📦 Tech Stack
Next.js 14+

React 18

Tailwind CSS (if you're using it)

REST API backend

Netlify (deployment)

❤️ Author
Built by Tajbin Ovie 
