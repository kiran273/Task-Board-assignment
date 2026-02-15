import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Board from './pages/Board';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/board" 
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/board" replace />} />
            <Route path="*" element={<Navigate to="/board" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
