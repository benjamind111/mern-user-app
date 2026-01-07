import { useState } from "react";

function UserForm() {
  // 1. State to hold the input data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    city: ""
  });

  // 2. Handle typing in the inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle the Submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing

    try {
      const response = await fetch("https://mern-user-app-ir5o.onrender.com/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send data to Backend
      });

      if (response.ok) {
        alert("✅ User Saved Successfully!");
        setFormData({ name: "", age: "", email: "" }); // Clear form
      } else {
        alert("❌ Error Saving User");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

// ... (imports and logic same as before)

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="form-container"> {/* 👈 New Class */}
        
        <input 
          type="text" name="name" placeholder="Name" 
          value={formData.name} onChange={handleChange} required 
        />
        
        <input 
          type="number" name="age" placeholder="Age" 
          value={formData.age} onChange={handleChange} required 
        />
        
        <input 
          type="email" name="email" placeholder="Email" 
          value={formData.email} onChange={handleChange} required 
        />

        <input
  type="text"
  name="city"
  placeholder="City"
  value={formData.city}
  onChange={handleChange}
  required
/>

        
        <button type="submit" className="btn-save">Add User</button> {/* 👈 New Class */}

      </form>
    </div>
  );
}
export default UserForm;