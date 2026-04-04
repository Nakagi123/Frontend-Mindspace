import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx"
import { MoodProvider } from "./context/MoodContext"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import './index.css'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Mood from './pages/Mood.jsx'
import Study from './pages/Study.jsx'
import Results from "./pages/Results.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoodProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={
              <ProtectedRoute><Learn /></ProtectedRoute>
            } />
            <Route path="/learn/mood" element={
              <ProtectedRoute><Mood /></ProtectedRoute>
            } />
            <Route path="/learn/study" element={
              <ProtectedRoute><Study /></ProtectedRoute>
            } />
            <Route path="/learn/results" element={
              <ProtectedRoute><Results /></ProtectedRoute>
            } />
          </Routes>
        </MoodProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)