import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Feed from './components/Feed';
import AdminPage from './pages/AdminPage';
import AdminLogin from './components/AdminLogin';
import VideoPage from './components/VideoPage';
import Chatbot from './components/Chatbot';
import VisitCounter from './components/VisitCounter';
import { FaCommentDots } from 'react-icons/fa';

const isAdminLoggedIn = () => { 
  return localStorage.getItem('adminLoggedIn') === 'true';
};

const AdminRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

// Logo Component
const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: '24px',
    md: '32px',
    lg: '48px'
  };
  
  return (
    <div className="logo" style={{ fontSize: sizes[size] }}>
      <span className="logo-code">C</span>
      <span className="logo-z">Z</span>
      <span className="logo-dot">.</span>
    </div>
  );
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <VisitCounter />
      
      {/* Brand Tagline */}
      <div className="brand-tagline">🎓 Learn. Grow. CodeZ.</div>
      
      <button 
        className="chatbot-toggle-btn"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <FaCommentDots />
      </button>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id/:slug" element={<VideoPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
