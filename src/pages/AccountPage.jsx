import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaSignOutAlt, FaCog, FaHome } from 'react-icons/fa';

const AccountPage = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <button className="account-back-btn" onClick={() => navigate('/')}>
          <FaHome /> Back to Home
        </button>

        <div className="account-header">
          <div className="account-avatar">
            <div className="account-avatar-placeholder">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          <h2>{user.user_metadata?.username || user.email?.split('@')[0]}</h2>
          <p className="account-email">{user.email}</p>
          {isAdmin && <span className="account-badge-admin">🛡️ Admin</span>}
        </div>

        <div className="account-info">
          <div className="account-info-item">
            <FaUser className="account-info-icon" />
            <div>
              <label>Username</label>
              <p>{user.user_metadata?.username || 'Not set'}</p>
            </div>
          </div>
          <div className="account-info-item">
            <FaEnvelope className="account-info-icon" />
            <div>
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <button className="account-admin-btn" onClick={() => navigate('/admin')}>
            <FaCog /> Admin Panel
          </button>
        )}

        <button className="account-signout-btn" onClick={handleSignOut} disabled={loading}>
          <FaSignOutAlt /> {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
