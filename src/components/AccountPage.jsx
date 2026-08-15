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
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Back Button */}
        <button className="account-back-btn" onClick={() => navigate('/')}>
          <FaHome /> Back to Home
        </button>

        {/* Profile Header */}
        <div className="account-header">
          <div className="account-avatar">
            {user.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" />
            ) : (
              <div className="account-avatar-placeholder">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2>{user.user_metadata?.username || user.email?.split('@')[0]}</h2>
          <p className="account-email">{user.email}</p>
          {isAdmin && (
            <span className="account-badge-admin">🛡️ Admin</span>
          )}
        </div>

        {/* Profile Info */}
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

        {/* Admin Button (only for admins) */}
        {isAdmin && (
          <button
            className="account-admin-btn"
            onClick={() => navigate('/admin')}
          >
            <FaCog /> Admin Panel
          </button>
        )}

        {/* Sign Out Button */}
        <button
          className="account-signout-btn"
          onClick={handleSignOut}
          disabled={loading}
        >
          <FaSignOutAlt /> {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
