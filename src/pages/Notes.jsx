import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { notesApi } from "../lib/api";

const formatDate = (isoStr) => {
  if (!isoStr) return "";
  return new Date(isoStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const stripMarkdown = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\n+/g, " ")
    .trim();

const deriveTitle = (note) => {
  if (note.is_ai_generated) return "AI Summary";
  const firstLine = note.content.split("\n")[0].trim();
  return firstLine.length > 40 ? firstLine.slice(0, 40) + "…" : firstLine;
};

function SimpleMarkdown({ text }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-[60] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-2">Delete this note?</h2>
        <p className="text-sm text-gray-500 mb-6">This action can't be undone.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-5 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2 text-sm rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AddNoteModal({ onClose, onSave, loading }) {
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!content.trim()) return;
    onSave({ content });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Note</h2>
        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 transition resize-none"
            autoFocus
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 text-sm rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteDrawer({ note, onClose, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSave = async () => {
    if (!editContent.trim()) return;
    setSaving(true);
    await onSave(note._id, { content: editContent });
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(note.content);
    setIsEditing(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={handleBackdrop} />

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {note.is_ai_generated && (
              <span className="text-xs bg-violet-100 text-violet-600 font-semibold px-2.5 py-1 rounded-full">
                ✦ AI
              </span>
            )}
            <span className="text-sm text-gray-400">{formatDate(note.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            {!note.is_ai_generated && !isEditing && (
              <button onClick={() => setIsEditing(true)} className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="text-sm bg-gray-900 text-white font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-700 active:scale-95 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            )}
            <button onClick={() => setShowDeleteConfirm(true)} className="text-sm text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
              Delete
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={12}
              autoFocus
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition resize-none leading-relaxed"
            />
          ) : (
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {note.content.split("\n").map((line, i) => (
                <p key={i} className={line.trim() === "" ? "mt-3" : "mb-1"}>
                  <SimpleMarkdown text={line} />
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400 flex gap-4">
          <span>Created {formatDate(note.createdAt)}</span>
          {note.updatedAt !== note.createdAt && (
            <span>· Edited {formatDate(note.updatedAt)}</span>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => {
            onDelete(note._id);
            setShowDeleteConfirm(false);
            onClose();
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}

function NoteCard({ note, onClick, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const preview = stripMarkdown(note.content);
  const title = deriveTitle(note);

  return (
    <div
      className="relative bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-[140px] cursor-pointer hover:border-gray-300 hover:shadow-md transition-all group"
      onClick={() => { if (!menuOpen) onClick(note); }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          {note.is_ai_generated && (
            <span className="inline-block text-[10px] bg-violet-100 text-violet-500 font-semibold px-2 py-0.5 rounded-full mb-1.5">
              ✦ AI Generated
            </span>
          )}
          <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-3 leading-relaxed">{preview}</p>
        </div>

        <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                <button onClick={() => { onClick(note); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                  View
                </button>
                <button onClick={() => { onDelete(note._id); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-[11px] text-gray-300 text-right mt-3">{formatDate(note.createdAt)}</p>
      <div className="absolute bottom-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-gray-400">
        Click to open →
      </div>
    </div>
  );
}

// ================================
// Main Page
// ================================
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch semua notes saat pertama load
  useEffect(() => {
    notesApi.getAll()
      .then((data) => setNotes(data.notes))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
    try {
      await notesApi.delete(id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (id, { content }) => {
    setNotes((prev) =>
      prev.map((n) => n._id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n)
    );
    setActiveNote((prev) =>
      prev?._id === id ? { ...prev, content, updatedAt: new Date().toISOString() } : prev
    );
    try {
      await notesApi.update(id, content);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNote = async ({ content }) => {
    setAddLoading(true);
    try {
      const data = await notesApi.create(content);
      setNotes((prev) => [data.note, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  const aiNotes     = notes.filter((n) => n.is_ai_generated);
  const manualNotes = notes.filter((n) => !n.is_ai_generated);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white px-8 py-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Notes</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 border border-gray-300 text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 active:scale-95 transition"
          >
            + Add Note
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-500">
            {error}
            <button onClick={() => setError("")} className="ml-3 font-semibold underline">Dismiss</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 text-sm py-16">Loading notes...</p>
        )}

        {/* Empty */}
        {!loading && notes.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-16">
            No notes yet. Click "+ Add Note" to get started!
          </p>
        )}

        {/* Notes */}
        {!loading && notes.length > 0 && (
          <div className="space-y-8">
            {manualNotes.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">My Notes</h2>
                <div className="grid grid-cols-2 gap-4">
                  {manualNotes.map((note) => (
                    <NoteCard key={note._id} note={note} onClick={setActiveNote} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )}
            {aiNotes.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">AI Summaries</h2>
                <div className="grid grid-cols-2 gap-4">
                  {aiNotes.map((note) => (
                    <NoteCard key={note._id} note={note} onClick={setActiveNote} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddNoteModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddNote}
          loading={addLoading}
        />
      )}

      {activeNote && (
        <NoteDrawer
          note={activeNote}
          onClose={() => setActiveNote(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </>
  );
}