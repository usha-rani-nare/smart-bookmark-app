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

  // ✅ Check login status
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    });
  }, []);

  // ✅ Add bookmark
  function addBookmark(bm) {
    setBookmarks([...bookmarks, bm]);
  }

  // ✅ Delete bookmark
  function deleteBookmark(id) {
    setBookmarks(bookmarks.filter((bm) => bm.id !== id));
  }

  // ✅ Save edited bookmark
  function saveBookmark(updated) {
    setBookmarks(bookmarks.map((bm) => bm.id === updated.id ? updated : bm));
    setEditing(null);
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome {user.email}</h1>
      <h2>My Bookmarks</h2>

      {/* Add Form */}
      <AddBookmark onAdd={addBookmark} />

      {/* Bookmark List */}
      <BookmarkList
        bookmarks={bookmarks}
        onDelete={deleteBookmark}
        onEdit={setEditing}
      />

      {/* Edit Form */}
      {editing && (
        <EditBookmark bookmark={editing} onSave={saveBookmark} />
      )}
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
    onAdd({ id: Date.now(), title, url });
    setTitle("");
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="url"
        placeholder="Bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

// ✅ Bookmark List Component
function BookmarkList({ bookmarks, onDelete, onEdit }) {
  return (
    <ul>
      {bookmarks.map((bm) => (
        <li key={bm.id}>
          <a href={bm.url} target="_blank">{bm.title}</a>
          <button onClick={() => onEdit(bm)}>Edit</button>
          <button onClick={() => onDelete(bm.id)}>Delete</button>
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
    <div style={{ marginTop: "20px" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

