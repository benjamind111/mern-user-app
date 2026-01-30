import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Auth from './components/Auth';
import { ToastContainer } from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { useToast } from './hooks/useToast';
import './App.css';

function AppContent() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { toasts, showToast, dismissToast } = useToast();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showToast("Logged out successfully", "info");
  };

  if (!token) {
    return (
      <>
        <Auth 
          onLogin={() => setToken(localStorage.getItem("token"))} 
          showToast={showToast}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <Router>
      <div className="app-layout">
        <Sidebar onLogout={logout} />
        
        <main className="main-area">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users showToast={showToast} />} />
              <Route path="/settings" element={<Settings showToast={showToast} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;