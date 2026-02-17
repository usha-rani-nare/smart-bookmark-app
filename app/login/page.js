"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();

  // ✅ Google OAuth login
  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (!error) {
      router.push("/"); // redirect to homepage after login
    }
  }

  // ✅ Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login"); // return to login page
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Login to Smart Bookmark App</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            Login with Google
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

