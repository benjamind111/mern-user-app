import { useEffect, useState } from 'react'
import UserForm from './components/UserForm';
import UserList from './components/UserList'; 
import './App.css'; // 👈 IMPORT THE CSS FILE

function App() {
  const [message, setMessage] = useState("Waiting for Backend...")

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [])

  return (
    <div className="app-container"> {/* 👈 ADD THIS CLASS */}
      <h1>🚀 MERN User Manager</h1>
      <h2>Backend Status: <span style={{ color: "green", fontWeight: "bold" }}>{message}</span></h2>
      
      <hr style={{ margin: "20px 0", opacity: 0.2 }}/>
      
      <UserForm /> 
      <UserList />
    </div>
  )
}

export default App