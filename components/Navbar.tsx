"use client" // ✅ mark this as a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `font-medium transition ${
      pathname === path
        ? "text-blue-400 border-b-2 border-blue-400"
        : "text-gray-300 hover:text-blue-400"
    }`;

  return (
    <nav className="bg-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Smart Bookmark App</h1>
      <div className="flex gap-6">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/login" className={linkClasses("/login")}>
          Login
        </Link>
        <Link href="/logout" className={linkClasses("/logout")}>
          Logout
        </Link>
      </div>
    </nav>
  );
}

