import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Admin password - hardcoded for simplicity (change to env later)
    const ADMIN_PASSWORD = "DeciTeam#1234";

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="text-center mb-4">
          <h2 className="text-white mb-2">🔐 Admin Login</h2>
          <p className="text-muted small">
            Enter your admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light small">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-secondary bg-opacity-25 border-0 text-white">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control bg-secondary bg-opacity-25 text-white border-0"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger small py-2">{error}</div>
          )}

          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-link text-light text-decoration-none small"
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
