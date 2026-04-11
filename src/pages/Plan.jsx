import { useState } from "react";
import Navbar from "../components/Navbar";

const PRIORITY_OPTIONS = [
  { label: "High",   color: "bg-red-400" },
  { label: "Medium", color: "bg-yellow-400" },
  { label: "Low",    color: "bg-green-400" },
];

const getPriorityColor = (label) => {
  switch (label) {
    case "High":   return "bg-red-400";
    case "Medium": return "bg-yellow-400";
    case "Low":    return "bg-green-400";
    default:       return "bg-gray-400";
  }
};

const getDaysLeft = (deadline) => {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  if (isNaN(due.getTime())) return null;
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
};

const getDaysLeftColor = (days) => {
  if (days === null) return "text-gray-400";
  if (days <= 2) return "text-red-500";
  if (days <= 4) return "text-yellow-500";
  return "text-green-500";
};

const getDaysLeftLabel = (days) => {
  if (days === null) return "";
  if (days > 0) return `${days} days left`;
  if (days === 0) return "Due today";
  return "Overdue";
};

// ─── Task Card ───────────────────────────────────────────────────────────────

function TaskCard({ task, onDelete, onFinish, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing]   = useState(false);
  const [editTitle,    setEditTitle]    = useState(task.title);
  const [editSubject,  setEditSubject]  = useState(task.subject);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editPriority, setEditPriority] = useState(task.priority);

  const daysLeft = getDaysLeft(task.deadline);

  const handleSave = () => {
    onEdit(task.id, {
      title:    editTitle,
      subject:  editSubject,
      deadline: editDeadline,
      priority: editPriority,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditSubject(task.subject);
    setEditDeadline(task.deadline);
    setEditPriority(task.priority);
    setEditing(false);
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 transition";

  return (
    <div className={`bg-white border rounded-2xl shadow-sm transition-all duration-200
      ${task.finished ? "border-gray-100 opacity-60" : "border-gray-100"}
      ${expanded ? "shadow-md" : ""}`}
    >
      {/* Main row — click to expand */}
      <button
        onClick={() => { if (!editing) setExpanded(!expanded); }}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`w-3 h-3 rounded-full shrink-0 ${getPriorityColor(task.priority)}`} />
          <div className="min-w-0">
            <p className={`text-sm font-medium text-gray-800 truncate
              ${task.finished ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </p>
            {task.subject && (
              <p className="text-xs text-gray-400 mt-0.5">{task.subject}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          {daysLeft !== null && !task.finished && (
            <span className={`text-xs font-semibold ${getDaysLeftColor(daysLeft)}`}>
              {getDaysLeftLabel(daysLeft)}
            </span>
          )}
          {task.finished && (
            <span className="text-xs font-semibold text-gray-400">Done ✓</span>
          )}
          {/* Chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded section */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          {editing ? (
            /* ── Edit Mode ── */
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Subject</label>
                  <input
                    type="text"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Deadline</label>
                  <input
                    type="date"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Priority</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className={inputClass}
                  >
                    {PRIORITY_OPTIONS.map((o) => (
                      <option key={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200 active:scale-95 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ── View Mode ── */
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                {task.deadline ? `Due: ${task.deadline}` : "No deadline set"}
              </p>
              <div className="flex items-center gap-2">
                {/* Finished button */}
                <button
                  onClick={() => onFinish(task.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition active:scale-95
                    ${task.finished
                      ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  {task.finished ? "Undo" : "✓ Finished"}
                </button>

                {/* Edit button */}
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:scale-95 transition"
                >
                  Edit
                </button>

                {/* Delete button */}
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-500 rounded-xl hover:bg-red-100 active:scale-95 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Plan() {
  const [title,        setTitle]        = useState("");
  const [subject,      setSubject]      = useState("");
  const [deadline,     setDeadline]     = useState("");
  const [priority,     setPriority]     = useState("Medium");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Essay Bahasa Indonesia", subject: "Bahasa Indonesia", deadline: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0], priority: "High",   finished: false },
    { id: 2, title: "Biologi Notes",          subject: "Biologi",          deadline: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0], priority: "Medium", finished: false },
    { id: 3, title: "Math Homework",          subject: "Math",             deadline: new Date(Date.now() + 6 * 86400000).toISOString().split("T")[0], priority: "Low",    finished: false },
  ]);

  const handleAddTask = () => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title, subject, deadline, priority, finished: false }]);
    setTitle(""); setSubject(""); setDeadline(""); setPriority("Medium");
  };

  const handleDelete = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const handleFinish = (id) =>
    setTasks(tasks.map((t) => t.id === id ? { ...t, finished: !t.finished } : t));

  const handleEdit = (id, updated) =>
    setTasks(tasks.map((t) => t.id === id ? { ...t, ...updated } : t));

  const pending  = tasks.filter((t) => !t.finished);
  const finished = tasks.filter((t) => t.finished);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-8 py-10 max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Planner</h1>
          <p className="text-gray-500 mt-2 text-base">Keep track of your tasks and deadlines.</p>
        </div>

        {/* Add New Task Card */}
        <div className="bg-gray-100 rounded-2xl p-6 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">+</span> Add new task
          </h2>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Biologi Notes"
                className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none border border-transparent focus:border-gray-300 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Subject</label>
              <input
                type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Biologi"
                className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none border border-transparent focus:border-gray-300 transition"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Deadline</label>
              <input
                type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none border border-transparent focus:border-gray-300 transition"
              />
            </div>

            {/* Priority Dropdown */}
            <div className="flex-1 relative">
              <label className="block text-sm text-gray-600 mb-1">Priority</label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 flex items-center justify-between border border-transparent focus:border-gray-300 transition"
              >
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`} />
                  {priority}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  {PRIORITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.label} type="button"
                      onClick={() => { setPriority(opt.label); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition"
                    >
                      <span className={`w-3 h-3 rounded-full ${opt.color}`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAddTask}
            className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-700 active:scale-95 transition"
          >
            Add task
          </button>
        </div>

        {/* Pending Tasks */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            Task List
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
              {pending.length}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {pending.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8">No tasks yet. Add one above!</p>
            )}
            {pending.map((task) => (
              <TaskCard
                key={task.id} task={task}
                onDelete={handleDelete}
                onFinish={handleFinish}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>

        {/* Finished Tasks */}
        {finished.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-2">
              Completed
              <span className="text-sm font-semibold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                {finished.length}
              </span>
            </h2>
            <div className="flex flex-col gap-3">
              {finished.map((task) => (
                <TaskCard
                  key={task.id} task={task}
                  onDelete={handleDelete}
                  onFinish={handleFinish}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}