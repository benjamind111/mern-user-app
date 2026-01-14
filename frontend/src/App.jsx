import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css'; // 👈 IMPORT THE CSS FILE
import Auth from './components/Auth'; // 👈 Import the new component

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // If there is no token, show the Login Screen
  if (!token) {
    return <Auth onLogin={() => setToken(localStorage.getItem("token"))} />;
  }

  // If logged in, show the App
  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>🚀 MERN User Manager</h1>
      <button onClick={logout} style={{background: "red", color: "white", padding: "5px 10px", float: "right"}}>Logout</button>
      
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;