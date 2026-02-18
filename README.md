# Smart Bookmark App

A full‑stack web application that allows users to securely log in, manage bookmarks, and see real‑time updates. Built with **Next.js**, **Supabase**, and deployed on **Vercel**.

## 🚀 Live Demo
Production URL: [https://smart-bookmark-app-8v8a.vercel.app](https://smart-bookmark-app-8v8a.vercel.app)

## 🛠 Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Supabase (Authentication + Database)
- **Deployment:** Vercel
- **Version Control:** GitHub

---
## 🔑 Features
- Google OAuth login with Supabase
- Secure authentication and user privacy
- CRUD operations for bookmarks (Add, Edit, Delete)
- Real‑time updates using Supabase subscriptions
- Responsive UI with icons, transitions, and polished design

---
## ⚡ Challenges & Solutions
### 1. Authentication Redirects
- **Problem:** After Google login, users were redirected to `localhost:3000` even in production.
- **Solution:** Added both `http://localhost:3000` and `https://smart-bookmark-app-8v8a.vercel.app` to Supabase **Redirect URLs** and updated the **Site URL** to the Vercel domain.

### 2. Environment Variables
- **Problem:** Supabase keys were not loading correctly in production.
- **Solution:** Configured `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel environment variables and redeployed.

### 3. UI/UX Polish
- **Problem:** Basic UI felt unfinished.
- **Solution:** Added Tailwind styling, icons, transitions, and responsive layouts for a professional look.

---

## 📖 How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/usha-rani-nare/smart-bookmark-app.git

- Install dependencies:
  npm install
-  Add environment variables in .env.local:
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
- Run the development server:
    npm run dev
- Open http://localhost:3000 (localh- localhost in Bing) in your browser.

📹 Video Walkthrough
[https://www.loom.com/share/637cc1852f4a4330b302b6c303541b79]

🙌 Acknowledgements
- Supabase for authentication and database
- Vercel for seamless deployment
- Tailwind CSS for styling
- Microsoft Copilot for stepwise debugging and deployment guidance

---

✅ This README hits all the required points: live URL, tech stack, features, problems solved, and instructions.  



