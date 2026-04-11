const BASE = import.meta.env.VITE_API_URL;

// ================================
// Helper — semua request lewat sini
// ================================
const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const req = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeader(),
    body: body ? JSON.stringify(body) : undefined,
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  
  if (data.success === false) {
    throw new Error(data.message || "Request failed");
  }
  
  return data;
};

// ================================
// Auth — tidak butuh token
// ================================
export const authApi = {
  register: (name, email, password) =>
    fetch(`${BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");
      return data;
    }),

  login: (email, password) =>
    fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      return data;
    }),
};

// ================================
// Notes
// ================================
export const notesApi = {
  getAll: () => req("GET", "/api/notes"),
  getOne: (id) => req("GET", `/api/notes/${id}`),
  create: (content) => req("POST", "/api/notes", { content }), 
  update: (id, content) => req("PUT", `/api/notes/${id}`, { content }),
  delete: (id) => req("DELETE", `/api/notes/${id}`),
};

// ================================
// Plans
// ================================
export const plansApi = {
  getAll: () => req("GET", "/api/plan"),  
  create: (body) => req("POST", "/api/plan", body),
  update: (id, body) => req("PUT", `/api/plan/${id}`, body),
  delete: (id) => req("DELETE", `/api/plan/${id}`),
};

// ================================
// Streak
// ================================
export const streakApi = {
  get: () => req("GET", "/api/streak"),
  update: () => req("POST", "/api/streak/update"),
};

// ================================
// Summarize
// ================================
export const summarizeApi = {
  summarize: (text, mood, pace, difficulty) => 
    req("POST", "/api/summarize", { text, mood, pace, difficulty }),
};

// ================================
// Quiz
// ================================
export const quizApi = {
  generate: (body) => req("POST", "/api/quiz/generate", body),
};