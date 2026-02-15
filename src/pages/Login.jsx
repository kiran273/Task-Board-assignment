import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password, rememberMe);
    
    if (result.success) {
      navigate('/board');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="logo-icon">
              <div className="logo-grid">
                <div className="logo-cell"></div>
                <div className="logo-cell"></div>
                <div className="logo-cell"></div>
                <div className="logo-cell"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Task Board
          </motion.h1>
          
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to manage your tasks
          </motion.p>
        </div>

        <motion.form
          className="login-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="intern@demo.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="hint-button"
              onClick={() => setShowHint(!showHint)}
            >
              Need help?
            </button>
          </div>

          {showHint && (
            <motion.div
              className="hint-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CheckCircle size={16} />
              <div>
                <strong>Demo Credentials:</strong>
                <div className="credentials">
                  <span>Email: intern@demo.com</span>
                  <span>Password: intern123</span>
                </div>
              </div>
            </motion.div>
          )}

          <button type="submit" className="submit-button">
            <span>Sign In</span>
            <div className="button-glow"></div>
          </button>
        </motion.form>

      </motion.div>
    </div>
  );
};

export default Login;
