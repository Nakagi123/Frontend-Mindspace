# Mindpace 🧠

> **Study smarter, not harder.** Mindpace is a learning companion web app that adapts to your mood, pace, and energy — helping you study more effectively every day.

---

## ✨ Highlighted Features

### 🎭 Mood-Based Learning
Choose your study state before every session — Focused, Normal, Low Energy, or Tired. Mindpace adjusts the entire study experience based on how you feel, from the page title to the summarizer output style.

### 📄 AI-Powered Summarizer
Paste any study material and Mindpace will summarize it for you based on your selected **pace** (Slow / Normal / Fast) and **difficulty** (Easy / Medium / Hard). Too tired mid-session? Hit **"I'm Tired"** to switch to Relax Mode — a simplified, calming version of the summary.

### ⏱️ Pomodoro Focus Timer
A clean, circular countdown timer built on the Pomodoro technique:
- 25-minute focus sessions
- 5-minute short breaks
- 15-minute long break after 4 sessions
- Session progress dots, Start / Pause / Reset / Skip controls

### 🔥 Daily Streak
Track your consistency with a daily streak counter. Every day you study keeps your streak alive — small steps every day add up.

### 📋 Smart Planner
Add tasks with a title, subject, deadline, and priority (High / Medium / Low). Tasks show a color-coded countdown to their deadline. Click any task to expand it and access edit, finish, and delete actions. Completed tasks move to a separate section with a strikethrough.

### 🔐 Auth & Protected Routes
Register and log in to access all features. All pages except Home and Auth are protected — unauthenticated users are redirected to the home page automatically.

### 👤 Profile Page
View and edit your profile — name, email, bio, and password. Access it by clicking your name in the navbar.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM |
| State | React Context API |
| Icons | Custom SVG (Lucide React planned) |
| Backend | REST API (in progress) |
| Payment | Midtrans (planned) |

---

## 📁 Project Structure

```
src/
├── assets/              # Images, illustrations, logos
│   └── moods/           # Mood face illustrations
├── components/
│   ├── Navbar.jsx       # Top navigation bar
│   └── ProtectedRoute.jsx # Auth guard for protected pages
├── context/
│   ├── AuthContext.jsx  # Global auth state (user, login, logout)
│   └── MoodContext.jsx  # Global study state (mood, pace, difficulty, summary)
├── pages/
│   ├── Home.jsx         # Landing page
│   ├── Auth.jsx         # Login + Register (single page toggle)
│   ├── Learn.jsx        # Feature cards hub
│   ├── Mood.jsx         # Mood picker
│   ├── Study.jsx        # Material input + pace/difficulty
│   ├── Results.jsx      # Summary output + Relax Mode
│   ├── Focus.jsx        # Pomodoro timer + streak
│   ├── Plan.jsx         # Task planner
│   ├── Notes.jsx        # Notes (Iqbal)
│   ├── Quiz.jsx         # Quiz generator (Iqbal)
│   └── ProfilePage.jsx  # User profile + settings
├── services/
│   └── api.js           # API calls (pending backend)
├── App.css
├── index.css
└── main.jsx             # App entry point + routes
```

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone https://github.com/Nakagi123/Frontend-Mindspace.git
cd Frontend-Mindspace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🗺️ Page Routes

| Route | Page | Protected |
|---|---|---|
| `/` | Home | ❌ |
| `/auth` | Login / Register | ❌ |
| `/learn` | Feature Cards | ✅ |
| `/learn/mood` | Mood Picker | ✅ |
| `/learn/study` | Study / Summarizer | ✅ |
| `/learn/results` | Summary Results | ✅ |
| `/learn/quiz` | Quiz Generator | ✅ |
| `/timer` | Focus Timer | ✅ |
| `/plan` | Task Planner | ✅ |
| `/notes` | Notes | ✅ |
| `/profile` | Profile Page | ✅ |

---

## 🔄 User Flow

```
Home
 └── Register / Login (/auth)
       └── Learn (/learn)
             └── Mood Picker (/learn/mood)
                   └── Study - paste material, set pace & difficulty (/learn/study)
                         └── Results - view summary, keywords, key points (/learn/results)
                               ├── I'm Tired → Relax Mode (same page)
                               ├── Generate Quiz (/learn/quiz)
                               └── Notes (/notes)

Navbar
 ├── Focus Timer (/timer)
 ├── Plan (/plan)
 ├── Notes (/notes)
 └── Profile (/profile) ← click your name
```

---

## 🌐 API Endpoints (Backend - In Progress)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login with email + password |
| POST | `/summarize` | Summarize material by pace + difficulty |
| GET | `/streak` | Get current user streak |
| POST | `/streak/update` | Update streak after study session |
| POST | `/quiz/generate` | Generate quiz from material |
| GET | `/notes` | Fetch user notes |
| POST | `/notes` | Save a new note |
| GET | `/plan` | Fetch user tasks |
| POST | `/plan` | Save a new task |

---

## 👥 Team

| Name | Role |
|---|---|
| Elian | Frontend — Home, Auth, Learn Flow, Focus Timer, Navbar, Contexts |
| Iqbal | Frontend — Quiz, Notes, Plan, Profile |
| Backend Teammate | REST API, Database, Auth, AI Summarizer |

---

## 📌 Notes for Developers

- All protected routes use `<ProtectedRoute>` which redirects to `/` if `user` is null in `AuthContext`
- `MoodContext` stores `selectedMood`, `pace`, `difficulty`, and `summary` — shared across the Learn flow
- The `handleSubmit` in `Auth.jsx` and `handleSummarize` in `Study.jsx` use placeholder `login()` calls — replace with real API calls once backend is ready
- Images in `src/assets/` must be imported using ES module syntax (`import img from '...'`) — string paths don't work with Vite
- The streak displayed in `Focus.jsx` reads from `user?.streak` in `AuthContext` — backend must return `streak` in the login response

---

*Built with ❤️ for SMK Negeri 7 Semarang — Capstone Project 2026*