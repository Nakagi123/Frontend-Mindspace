import { useState } from "react";
import Logo from "../assets/profile-pages.png";

const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
  </svg>
);

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const navItems = [
    { id: "home", label: "Home", icon: <IconDashboard /> },
    { id: "profile", label: "Profile", icon: <IconProfile /> },
    { id: "settings", label: "Settings", icon: <IconSettings /> },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="mb-10 flex justify-center">
        <img 
          src={Logo} 
          alt="Mindpace Logo" 
          className="h-12 w-auto object-contain" 
        />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "home") {
                window.location.href = "/";
              } else {
                onNavigate(item.id);
              }
              onClose();
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition text-left w-full
              ${activePage === item.id && item.id !== "home"
                ? "bg-gray-100 text-gray-900 font-semibold"
                : activePage === item.id
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-50"
              }`}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Log out */}
      <button
        onClick={() => {
          alert("Logged out!");
          onClose();
        }}
        className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 transition w-full"
      >
        <IconLogout />
        <span className="hidden md:inline">Log out</span>
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar (Overlay) */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <aside className="fixed left-0 top-0 w-64 h-full bg-white z-50 flex flex-col px-6 py-8 shadow-xl md:hidden">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-900"
            >
              <IconClose />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 min-h-screen bg-white flex-col px-6 py-8 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}

function HomeView() {
  return (
    <div className="flex items-center justify-center flex-1 bg-gray-200 px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Welcome to Mindpace! 🎉
        </h1>
        <p className="text-gray-600 text-lg">
          This is your home page
        </p>
      </div>
    </div>
  );
}

function ProfileView({ user, onEditClick }) {
  return (
    <div className="flex items-center justify-center flex-1 bg-gray-200 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-sm w-full max-w-md px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 overflow-hidden mb-6 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>

        {/* Name & Email */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-xs sm:text-sm text-gray-500 underline underline-offset-2 mt-1 mb-6 break-all">{user.email}</p>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 mb-6" />

        {/* Bio */}
        <p className="text-sm text-gray-500 mb-8">{user.bio || "No bio yet."}</p>

        {/* Edit Profile Button */}
        <button
          onClick={onEditClick}
          className="bg-gray-900 text-white text-sm font-bold px-6 sm:px-8 py-3 rounded-xl hover:bg-gray-700 active:scale-95 transition w-full"
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
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;
    onSave({ name, email, password });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex items-center justify-center flex-1 bg-gray-200 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-sm w-full max-w-lg px-6 sm:px-12 py-8 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Profile Settings</h2>

        <div className="mb-5">
          <label className="block text-sm sm:text-base text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm sm:text-base text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm sm:text-base text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition"
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full text-sm font-bold py-3 rounded-xl transition active:scale-95
            ${saved ? "bg-green-500 text-white" : "bg-gray-900 text-white hover:bg-gray-700"}`}
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [activePage, setActivePage] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      case "home":
        return <HomeView />;
      case "profile":
        return <ProfileView user={user} onEditClick={() => setActivePage("settings")} />;
      case "settings":
        return <SettingsView user={user} onSave={handleSaveSettings} />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex flex-1 flex-col">
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <IconMenu />
          </button>
          <img 
            src={Logo} 
            alt="Mindpace Logo" 
            className="h-8 w-auto" 
          />
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
}