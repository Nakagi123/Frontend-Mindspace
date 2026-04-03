import { useState } from "react";
import Navbar from "../components/Navbar";

const PRIORITY_OPTIONS = [
  { label: "High", color: "bg-red-400" },
  { label: "Medium", color: "bg-yellow-400" },
  { label: "Low", color: "bg-green-400" },
];

const getPriorityColor = (label) => {
  switch (label) {
    case "High":
      return "bg-red-400";
    case "Medium":
      return "bg-yellow-400";
    case "Low":
      return "bg-green-400";
    default:
      return "bg-gray-400";
  }
};

const getDaysLeft = (deadline) => {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  
  if (isNaN(due.getTime())) return null;
  
  due.setHours(0, 0, 0, 0);
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  return diff;
};

const getDaysLeftColor = (days) => {
  if (days === null) return "text-gray-500";
  if (days <= 2) return "text-red-500";
  if (days <= 4) return "text-yellow-500";
  return "text-green-500";
};

export default function Plan() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Essay Bahasa Indonesia", subject: "Bahasa Indonesia", deadline: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0], priority: "High" },
    { id: 2, title: "Biologi Notes", subject: "Biologi", deadline: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0], priority: "Medium" },
    { id: 3, title: "Math Homework", subject: "Math", deadline: new Date(Date.now() + 6 * 86400000).toISOString().split("T")[0], priority: "Low" },
  ]);

  const handleAddTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      subject,
      deadline,
      priority,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setSubject("");
    setDeadline("");
    setPriority("Medium");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

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

          {/* Title & Subject */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Biologi Notes"
                className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none border border-transparent focus:border-gray-300 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Biologi"
                className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none border border-transparent focus:border-gray-300 transition"
              />
            </div>
          </div>

          {/* Deadline & Priority */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Deadline</label>
              <div className="relative">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none border border-transparent focus:border-gray-300 transition appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                  </svg>
                </span>
              </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setPriority(opt.label);
                        setDropdownOpen(false);
                      }}
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

          {/* Add Task Button */}
          <button
            onClick={handleAddTask}
            className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-700 active:scale-95 transition"
          >
            Add task
          </button>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            Task List
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
              {tasks.length}
            </span>
          </h2>

          <div className="flex flex-col gap-3">
            {tasks.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8">No tasks yet. Add one above!</p>
            )}
            {tasks.map((task) => {
              const daysLeft = getDaysLeft(task.deadline);
              return (
                <div
                  key={task.id}
                  className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${getPriorityColor(task.priority)}`} />
                    <span className="text-gray-800 text-sm font-medium">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {daysLeft !== null && (
                      <span className={`text-sm font-semibold ${getDaysLeftColor(daysLeft)}`}>
                        {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? "Due today" : "Overdue"}
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                      aria-label="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}