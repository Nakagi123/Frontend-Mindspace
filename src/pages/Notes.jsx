import { useState } from "react";
import Navbar from "../components/Navbar";

// ================================
// Dummy data — ganti dengan API call nanti
// ================================
const DUMMY_NOTES = [
  { id: 1, title: "Biology", content: "Study respiratory system", date: "2026-04-12" },
  { id: 2, title: "Mathematics", content: "Algebra formulas notes", date: "2026-03-17" },
  { id: 3, title: "Physics", content: "Calculate velocity", date: "2026-04-27" },
];

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long" });
};

// ================================
// Modal: Add / Edit Note
// ================================
function NoteModal({ note, onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, content });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {note ? "Edit Note" : "Add New Note"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Biology"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 transition resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 active:scale-95 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================
// Note Card
// ================================
function NoteCard({ note, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[140px]">
      {/* Top */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{note.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{note.content}</p>
        </div>

        {/* 3-dot menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
              <button
                onClick={() => { onEdit(note); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Edit
              </button>
              <button
                onClick={() => { onDelete(note.id); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-400 text-right mt-4">{formatDate(note.date)}</p>
    </div>
  );
}

// ================================
// Main Notes Page
// ================================
export default function Notes() {
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // TODO: Replace with API call — GET /api/notes
  // useEffect(() => {
  //   fetch("/api/notes")
  //     .then(res => res.json())
  //     .then(data => setNotes(data));
  // }, []);

  const handleAdd = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    // TODO: API call — DELETE /api/notes/:id
    // fetch(`/api/notes/${id}`, { method: "DELETE" });
  };

  const handleSave = ({ title, content }) => {
    if (editingNote) {
      // Edit existing
      setNotes(notes.map((n) =>
        n.id === editingNote.id ? { ...n, title, content } : n
      ));
      // TODO: API call — PUT /api/notes/:id
      // fetch(`/api/notes/${editingNote.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ title, content }),
      // });
    } else {
      // Add new
      const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString().split("T")[0],
      };
      setNotes([...notes, newNote]);
      // TODO: API call — POST /api/notes
      // fetch("/api/notes", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ title, content }),
      // }).then(res => res.json()).then(data => setNotes([...notes, data]));
    }
    setShowModal(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white px-8 py-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Notes</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 border border-gray-300 text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 active:scale-95 transition"
          >
            + Add Note
          </button>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-16">
            No notes yet. Click "+ Add Note" to get started!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <NoteModal
          note={editingNote}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}