import { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { ToastContainer } from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { useToast } from './hooks/useToast';
import './App.css';

function AppContent() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const { toasts, showToast, dismissToast } = useToast();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showToast("Logged out successfully", "info");
  };

  if (!token) {
    return <Auth onLogin={() => setToken(localStorage.getItem("token"))} />;
  }

  return (
    <div className="app-layout">
      <Sidebar onLogout={logout} />
      
      <main className="main-area">
        <div className="content-wrapper">
          <Dashboard totalUsers={users.length} />
          <UserForm 
            showToast={showToast} 
            onUserAdded={() => window.location.reload()}
          />
          <UserList 
            showToast={showToast}
          />
        </div>
      </main>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
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