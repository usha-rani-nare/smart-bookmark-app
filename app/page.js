"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [editing, setEditing] = useState(null);

  // ✅ Check login and load bookmarks
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        const { data: bms, error } = await supabase
          .from("bookmark")
          .select("*")
          .eq("user_id", data.user.id)
          .order("created_at", { ascending: false });

        if (!error) setBookmarks(bms || []);
      }
    });
  }, []);

  // ✅ Add bookmark
  async function addBookmark(bm) {
    const { data, error } = await supabase
      .from("bookmark")
      .insert([{ title: bm.title, url: bm.url, user_id: user.id }])
      .select();

    if (!error && data) {
      setBookmarks([data[0], ...bookmarks]);
    }
  }

  // ✅ Delete bookmark
  async function deleteBookmark(id) {
    const { error } = await supabase.from("bookmark").delete().eq("id", id);
    if (!error) {
      setBookmarks(bookmarks.filter((bm) => bm.id !== id));
    }
  }

  // ✅ Save edited bookmark
  async function saveBookmark(updated) {
    const { data, error } = await supabase
      .from("bookmark")
      .update({ title: updated.title, url: updated.url })
      .eq("id", updated.id)
      .select();

    if (!error && data) {
      setBookmarks(bookmarks.map((bm) => bm.id === updated.id ? data[0] : bm));
      setEditing(null);
    }
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl mb-4">Welcome {user.email}</h1>
      <h2 className="text-xl mb-6">My Bookmarks</h2>

      <AddBookmark onAdd={addBookmark} />

      <BookmarkList
        bookmarks={bookmarks}
        onDelete={deleteBookmark}
        onEdit={setEditing}
      />

      {editing && <EditBookmark bookmark={editing} onSave={saveBookmark} />}
    </div>
  );
}

// ✅ Add Bookmark Component
function AddBookmark({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !url) return;
    onAdd({ title, url });
    setTitle("");
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
      />
      <input
        type="url"
        placeholder="Bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Add
      </button>
    </form>
  );
}

// ✅ Bookmark List Component
function BookmarkList({ bookmarks, onDelete, onEdit }) {
  return (
    <ul className="space-y-3 w-full max-w-md">
      {bookmarks.map((bm) => (
        <li key={bm.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded">
          <a href={bm.url} target="_blank" className="text-blue-400 hover:underline flex-1">
            {bm.title}
          </a>
          <button
            onClick={() => onEdit(bm)}
            className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-black"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(bm.id)}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

// ✅ Edit Bookmark Component
function EditBookmark({ bookmark, onSave }) {
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url);

  function handleSave() {
    onSave({ ...bookmark, title, url });
  }

  return (
    <div className="flex gap-2 mt-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
      >
        Save
      </button>
    </div>
  );
}

