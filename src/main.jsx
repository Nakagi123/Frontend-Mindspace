// main.jsx
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
import Plan from './pages/Plan.jsx'  
import Notes from './pages/Notes.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Study from './pages/Study.jsx'
import Results from "./pages/Results.jsx"
import Auth from "./pages/Auth.jsx";
import Focus from "./pages/Focus.jsx";
import Quiz from './pages/Quiz.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoodProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            
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
            <Route path="/learn/quiz" element={
              <ProtectedRoute><Quiz /></ProtectedRoute>
            } />
            <Route path="/plan" element={
              <ProtectedRoute><Plan /></ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute><Notes /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><ProfilePage /></ProtectedRoute>
            } />
            <Route path="/timer" element={
              <ProtectedRoute><Focus /></ProtectedRoute>
            } />
          </Routes>
        </MoodProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)