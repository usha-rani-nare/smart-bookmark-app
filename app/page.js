"use client"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"

export default function HomePage() {
  const [session, setSession] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [newBookmark, setNewBookmark] = useState("")
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) {
        fetchBookmarks(data.session.user.id)
      }
    })
  }, [])

  const fetchBookmarks = async (userId) => {
    const { data } = await supabase
      .from("bookmark")
      .select("*")
      .eq("user_id", userId)
    setBookmarks(data || [])
  }

  const addBookmark = async () => {
    if (!newBookmark || !newTitle || !session) return
    await supabase.from("bookmark").insert({
      user_id: session.user.id,
      url: newBookmark,
      title: newTitle,
    })
    setNewBookmark("")
    setNewTitle("")
    fetchBookmarks(session.user.id)
  }

  const deleteBookmark = async (id) => {
    await supabase.from("bookmark").delete().eq("id", id)
    fetchBookmarks(session.user.id)
  }

  const updateBookmark = async (id, updatedTitle) => {
    await supabase.from("bookmark").update({ title: updatedTitle }).eq("id", id)
    fetchBookmarks(session.user.id)
  }

  if (!session) {
    return <p className="text-center text-white">Please login first at /login</p>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome, {session.user.email}
      </h1>

      {/* Add Bookmark Form */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-6">Add a Bookmark</h2>

        <label className="block text-sm mb-2">Enter a name for your link</label>
        <input
          type="text"
          maxLength={25}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="25 characters max"
          className="input mb-4"
        />

        <label className="block text-sm mb-2">Enter your bookmark link</label>
        <input
          type="url"
          value={newBookmark}
          onChange={(e) => setNewBookmark(e.target.value)}
          placeholder="https://example.com/"
          className="input mb-4"
        />

        <button onClick={addBookmark} className="btn btn-primary w-full mt-4">
          Add
        </button>
      </div>

      {/* Bookmark List */}
      <ul className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md mx-auto">
        {bookmarks.map((bm) => (
          <li key={bm.id} className="mb-4 flex gap-4 items-center">
            {/* Favicon */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${bm.url}`}
              alt="favicon"
              className="h-6 w-6 rounded"
            />

            {bm.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={bm.title}
                  onBlur={(e) => updateBookmark(bm.id, e.target.value)}
                  className="input"
                />
                <button
                  onClick={() =>
                    setBookmarks(
                      bookmarks.map((b) =>
                        b.id === bm.id ? { ...b, isEditing: false } : b
                      )
                    )
                  }
                  className="btn btn-warning"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <a
                  href={bm.url}
                  target="_blank"
                  className="text-blue-400 underline text-lg font-medium hover:text-blue-300 transition"
                >
                  {bm.title}
                </a>
                <button
                  onClick={() => deleteBookmark(bm.id)}
                  className="btn btn-danger flex items-center gap-2"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() =>
                    setBookmarks(
                      bookmarks.map((b) =>
                        b.id === bm.id ? { ...b, isEditing: true } : b
                      )
                    )
                  }
                  className="btn btn-warning flex items-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Supabase Footer */}
      <footer className="text-center text-gray-400 mt-12 flex justify-center items-center gap-2">
        <span>Powered by</span>
        <img
          src="https://supabase.com/icons/supabase-icon.svg"
          alt="Supabase logo"
          className="h-5 w-5"
        />
        <span className="text-blue-400 font-semibold">Usha</span>
      </footer>
    </div>
  )
}

