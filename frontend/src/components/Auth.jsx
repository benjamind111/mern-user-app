import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "register" : "login";
    
    // 👇 UPDATE THIS WITH YOUR RENDER URL
    const URL = `https://mern-user-app-ir5o.onrender.com/api/auth/${endpoint}`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Get the response from server

      if (response.ok) {
        if (isRegistering) {
          setMessage("Registration successful! Now please login.");
          setIsRegistering(false); // Switch to login mode
        } else {
          // LOGIN SUCCESS: Save token and tell App.jsx we are in!
          localStorage.setItem("token", data.token);
          onLogin(); 
        }
      } else {
        setMessage(data); // Show error message from server
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>{isRegistering ? "📝 Register Admin" : "🔐 Admin Login"}</h2>
      
      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ width: "90%", padding: "10px", margin: "10px 0" }}
        />
        <br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ width: "90%", padding: "10px", margin: "10px 0" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px", cursor: "pointer", color: "blue" }} onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
      </p>
    </div>
  );
};

export default Auth;