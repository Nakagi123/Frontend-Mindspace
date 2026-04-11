# Mindpace 🧠

> **Study smarter, not harder.** Mindpace is a web-based learning companion that adapts to how you feel — helping students study more effectively, stay consistent, and actually enjoy the process.

---

## 📖 What is Mindpace?

Mindpace is a smart study platform designed for students who want to learn more efficiently. Instead of one-size-fits-all studying, Mindpace asks how you're feeling before every session and adjusts your entire experience accordingly — from how your material is summarized, to how fast you should go, to how difficult the content should be.

Whether you're fully focused, running on low energy, or completely exhausted, Mindpace has a mode for you.

---

## ✨ Features

### 🎭 Mood-Based Learning
Before every study session, you choose your current study state:
- **Focused** — You're ready to go. Full speed ahead.
- **Normal** — Steady and balanced. A comfortable pace.
- **Low Energy** — Taking it slower today. That's okay.
- **Tired** — Keep it simple. Mindpace will simplify everything for you.

Your mood affects the entire session — the page title, the summarizer output, and the study pace all adapt to how you feel.

---

### 📄 AI-Powered Summarizer
Paste any study material — lecture notes, textbook excerpts, articles — and Mindpace will summarize it for you automatically.

You control how it summarizes:
- **Pace** — Slow, Normal, or Fast reading speed
- **Difficulty** — Easy (key points only), Medium (with explanations), or Hard (full detail)

The output includes:
- **Key Points** — The most important takeaways from your material
- **Keywords** — Key terms to remember

Too tired mid-session? Hit **"I'm Tired"** to activate **Relax Mode** — a simplified, calming version of the summary with an encouraging message to keep you going. 😌

---

### 🧠 Quiz Generator
After summarizing your material, generate a quiz automatically from what you just read. The quiz:
- Creates multiple choice questions based on your material
- Highlights correct and incorrect answers after each question
- Shows a detailed score breakdown at the end
- Gives personalized recommendations based on your score (below 60%, 60–80%, above 80%)

Perfect for testing yourself before an exam!

---

### 📝 Notes
Save important study notes directly in Mindpace. Notes can be:
- Written manually by you
- Automatically saved from your AI summaries

All your notes are stored in one place so you can come back to them anytime.

---

### ⏱️ Pomodoro Focus Timer
A clean, distraction-free timer built on the Pomodoro technique — a scientifically proven study method:
- **25 minutes** of focused study
- **5-minute** short break
- **15-minute** long break after every 4 sessions

Features include a circular progress ring, session progress dots, and Start / Pause / Reset / Skip controls. The ring turns orange during breaks to signal rest time.

---

### 🔥 Daily Streak
Stay consistent with a daily streak counter. Every day you log in and study, your streak grows. The Focus Timer page shows your current streak so you're always motivated to keep it alive.

> *Small steps every day add up.* 🔥

---

### 📋 Smart Planner
Stay on top of your assignments and deadlines with the task planner:
- Add tasks with a **title**, **subject**, **deadline**, and **priority** (High / Medium / Low)
- Color-coded priority dots for quick visibility
- Countdown shows how many days are left until the deadline (red = urgent, yellow = soon, green = fine)
- Click any task to **expand** it and access Edit, Finish, and Delete
- Finished tasks move to a **Completed** section with a strikethrough
- Never miss a deadline again!

---

### 🔐 Login & Register
Create a personal Mindpace account to access all features. Your data — notes, tasks, streak, and profile — is tied to your account and saved securely.

All study features are protected and only accessible when you're logged in.

---

### 👤 Profile Page
View and manage your personal profile:
- See your name, email, and bio
- Edit your profile information and password
- Access your profile anytime by clicking your name in the navigation bar

---

## 🗺️ How to Use Mindpace

```
1. Go to Mindpace and Register or Login
        ↓
2. Click "Learn" in the navbar
        ↓
3. Pick your mood (Focused / Normal / Low Energy / Tired)
        ↓
4. Paste your study material
   Set your pace and difficulty
   Click Summarize
        ↓
5. Read your Key Points and Keywords
   Too tired? Hit "I'm Tired" for Relax Mode
        ↓
6. Click "Generate Quiz" to test yourself
        ↓
7. See your score, review your answers,
   and get personalized recommendations
        ↓
8. Use the Planner to track your assignments
   Use the Focus Timer to stay on track
   Save notes for later review
```

---

## 🌐 Page Guide

| Page | What it does |
|---|---|
| `/` | Home — landing page |
| `/auth` | Login or Register |
| `/learn` | Choose a feature to start |
| `/learn/mood` | Pick your study mood |
| `/learn/study` | Paste material + set pace & difficulty |
| `/learn/results` | View your AI summary |
| `/learn/quiz` | Take a quiz based on your material |
| `/timer` | Pomodoro focus timer + streak |
| `/plan` | Task planner with deadlines |
| `/notes` | Your saved notes |
| `/profile` | Your profile and settings |

---

## 👥 Team

| Name | Role |
|---|---|
| Farrel | Team Leader |
| Caca | UI/UX Designer |
| Elok | UI/UX Designer |
| Elian | Frontend Developer |
| Iqbal | Frontend Developer |
| Kheira | Backend Developer |

---

## 🛠️ Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| React 18 + Vite | Core framework + build tool |
| Tailwind CSS v4 | Styling |
| React Router DOM | Page routing |
| React Context API | Global state management |

### Backend
| Package | Purpose |
|---|---|
| Express | REST API framework |
| Mongoose | ODM for MongoDB |
| MongoDB | Database |
| dotenv | Environment variable management |
| cors | Allow frontend API access |
| helmet | HTTP security headers |
| jsonwebtoken | JWT authentication |
| bcryptjs | Password hashing |
| express-validator | Request validation |
| uuid | Unique ID generation |
| nodemon | Auto-reload during development |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Vercel | Backend hosting |

---

## 🚀 Quick Start (For Developers)

### 1. Clone the repository
```bash
git clone https://github.com/Nakagi123/Mindpace.git
cd Mindpace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root:
```
VITE_API_URL=your_backend_url_here
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Open in browser
```
http://localhost:5173
```

---

## 📌 Developer Notes

- All protected routes use `<ProtectedRoute>` — redirects to `/` if not logged in
- `MoodContext` stores `selectedMood`, `pace`, `difficulty`, and `summary` across the Learn flow
- Images in `src/assets/` must use ES module imports — string paths don't work with Vite
- The streak in `Focus.jsx` reads from `user?.streak` in `AuthContext` — backend must return `streak` in the login response
- `vercel.json` is configured to handle client-side routing on refresh
- Never commit `.env` to GitHub — use Vercel Environment Variables instead

---

*Built with ❤️ for SMK Negeri 7 Semarang — Dicoding Capstone Project 2026*