import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ================================
// Icons
// ================================
const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H14v-6h-4v6H4a1 1 0 01-1-1V9.75z" />
  </svg>
);

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
  </svg>
);

// ================================
// Sidebar
// ================================
function Sidebar({ activePage, onNavigate }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <IconDashboard /> },
    { id: "profile", label: "Profile", icon: <IconProfile /> },
    { id: "settings", label: "Settings", icon: <IconSettings /> },
  ];

  return (
    <aside className="w-40 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 flex-shrink-0">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-900 mb-8 px-2 flex items-center gap-1">
        mindpace <span className="text-xl">🙂</span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition text-left w-full
              ${activePage === item.id
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Log out */}
      <button
        onClick={() => {
          // TODO: API call — POST /api/auth/logout
          // fetch("/api/auth/logout", { method: "POST" }).then(() => navigate("/"));
          alert("Logged out!");
        }}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition w-full"
      >
        <IconLogout />
        Log out
      </button>
    </aside>
  );
}

// ================================
// Profile View
// ================================
function ProfileView({ user }) {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-80 p-8 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>

        {/* Name & Email */}
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-sm text-gray-400 underline underline-offset-2 mt-1">{user.email}</p>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 my-5" />

        {/* Bio */}
        <p className="text-sm text-gray-500 mb-6">{user.bio || "No bio yet."}</p>

        {/* Edit button */}
        <button
          className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-700 active:scale-95 transition w-full"
        // onClick handled in parent to switch to settings
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

// ================================
// Settings View
// ================================
function SettingsView({ user, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;
    onSave({ name, email, password });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: API call — PUT /api/user/profile
    // fetch("/api/user/profile", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, password }),
    // });
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-80 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full text-sm font-semibold py-2.5 rounded-xl transition active:scale-95
            ${saved ? "bg-green-500 text-white" : "bg-gray-900 text-white hover:bg-gray-700"}`}
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ================================
// Main Profile Page
// ================================
export default function ProfilePage() {
  const [activePage, setActivePage] = useState("profile");

  // TODO: Replace with real user data from AuthContext or API
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "Princess Snowman",
    email: "email@gmail.com",
    bio: "Loves learning & staying focused",
    avatar: null,
  });

  const handleSaveSettings = ({ name, email }) => {
    setUser((prev) => ({ ...prev, name, email }));
    setActivePage("profile");
  };

  const renderContent = () => {
    switch (activePage) {
      case "profile":
        return <ProfileView user={user} />;
      case "settings":
        return <SettingsView user={user} onSave={handleSaveSettings} />;
      case "dashboard":
        // TODO: navigate ke halaman dashboard
        return (
          <div className="flex items-center justify-center flex-1 text-gray-400 text-sm">
            Redirecting to Dashboard...
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex flex-1">{renderContent()}</main>
    </div>
  );
}