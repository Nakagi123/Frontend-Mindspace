import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx";
import { MoodProvider } from "./context/MoodContext";
import './index.css'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Mood from './pages/Mood.jsx'
import Study from './pages/Study.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoodProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/mood" element={<Mood />} />
            <Route path="/learn/study" element={<Study />} />
          </Routes>
        </MoodProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)