import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx";
import './index.css'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Mood from './pages/Mood.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/mood" element={<Mood />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)