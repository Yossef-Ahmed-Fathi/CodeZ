import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Feed from './components/Feed';
import AdminPage from './pages/AdminPage';
import AdminLogin from './components/AdminLogin';
import VideoPage from './components/VideoPage';
import VisitCounter from './components/VisitCounter';

const isAdminLoggedIn = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

const AdminRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <VisitCounter />
      
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
