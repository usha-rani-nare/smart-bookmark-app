import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Bookmark App",
  description: "Manage your bookmarks easily",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}

