import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const CREDENTIALS = {
  email: 'intern@demo.com',
  password: 'intern123'
};

const STORAGE_KEY = 'taskboard_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved session on mount
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      try {
        const { email, timestamp } = JSON.parse(savedAuth);
        // Session valid for 7 days
        const isValid = Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000;
        if (isValid && email === CREDENTIALS.email) {
          setUser({ email });
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, rememberMe) => {
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      const userData = { email };
      setUser(userData);
      
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          email,
          timestamp: Date.now()
        }));
      }
      
      return { success: true };
    }
    
    return { 
      success: false, 
      error: 'Invalid email or password. Please try again.' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
