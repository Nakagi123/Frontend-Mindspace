import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // cek token saat pertama load

  // Saat app pertama dibuka — restore user dari localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login — hit API, simpan token + user
 const login = async (email, password) => {
  const data = await authApi.login(email, password);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  setUser(data.user);
  console.log("login done, user set:", data.user); // tambah ini
  return data;
};

  // Register — hit API, langsung login otomatis
  const register = async (name, email, password) => {
    await authApi.register(name, email, password);
    // Setelah register, langsung login
    return login(email, password);
  };

  // Logout — bersihkan semua
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);