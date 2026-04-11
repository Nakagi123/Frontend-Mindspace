import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/profile-pages.png";


const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const NAV_ITEMS = [
  { id: "home",     label: "Home",     icon: <IconDashboard /> },
  { id: "profile",  label: "Profile",  icon: <IconProfile /> },
  { id: "settings", label: "Settings", icon: <IconSettings /> },
];

function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleNav = (id) => {
    if (id === "home") {
      navigate("/");
    } else {
      onNavigate(id);
    }
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="mb-10">
        <img src={Logo} alt="Mindpace Logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full
              ${activePage === item.id
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-150 w-full"
      >
        <IconLogout />
        <span>Log out</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />
          <aside className="fixed left-0 top-0 w-64 h-full bg-white z-50 flex flex-col px-6 py-8 shadow-xl md:hidden">
            <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition">
              <IconClose />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 min-h-screen bg-white border-r border-gray-100 flex-col px-5 py-8 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}

function ProfileView({ user, onEditClick }) {
  return (
    <div className="flex items-center justify-center flex-1 px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm w-full max-w-md px-8 py-10 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-5 flex items-center justify-center border-4 border-gray-50 shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>

        {/* Name & Email */}
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-sm text-gray-400 mt-1 mb-6">{user.email}</p>

        <div className="w-full border-t border-gray-100 mb-6" />

        {/* Bio */}
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          {user.bio || "No bio yet."}
        </p>

        <button
          onClick={onEditClick}
          className="bg-gray-900 text-white text-sm font-semibold px-8 py-3 rounded-xl
                     hover:bg-gray-700 active:scale-95 transition-all duration-200 w-full"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function SettingsView({ user, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;
    onSave({ name, email, bio, password });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, children }) => (
    <div className="mb-5">
      <label className="block text-sm text-gray-600 font-medium mb-2">{label}</label>
      {children}
    </div>
  );

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition-all duration-150";

  return (
    <div className="flex items-center justify-center flex-1 px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm w-full max-w-lg px-8 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Profile Settings</h2>

        <Field label="Name">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Email">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Bio">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell us about yourself..."
            className={`${inputClass} resize-none`}
          />
        </Field>
        <Field label="New Password">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className={inputClass} />
        </Field>

        <button
          onClick={handleSave}
          className={`w-full text-sm font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 mt-2
            ${saved ? "bg-green-500 text-white" : "bg-gray-900 text-white hover:bg-gray-700"}`}
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const [activePage, setActivePage] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [user, setUser] = useState({
    name: authUser?.name || "User",
    email: authUser?.email || "",
    bio: authUser?.bio || "",
    avatar: authUser?.avatar || null,
  });

  const handleSaveSettings = ({ name, email, bio }) => {
    setUser((prev) => ({ ...prev, name, email, bio }));
    setActivePage("profile");
  };

  const renderContent = () => {
    switch (activePage) {
      case "profile":
        return <ProfileView user={user} onEditClick={() => setActivePage("settings")} />;
      case "settings":
        return <SettingsView user={user} onSave={handleSaveSettings} />;
      default:
        return <ProfileView user={user} onEditClick={() => setActivePage("settings")} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <IconMenu />
          </button>
          <span className="text-lg font-bold text-gray-900">mindpace.</span>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}