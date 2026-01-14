import { useState } from "react";

function UserForm() {
  // 1. State to hold the input data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    city: ""
  });

  const [image, setImage] = useState(null);

  // 2. Handle typing in the inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle the Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('age', formData.age);     // ✅ Fixed: using formData.age
    dataToSend.append('email', formData.email);
    dataToSend.append('city', formData.city);
    
    if (image) {
      dataToSend.append('image', image);
    }

    try {
      // 📝 DEBUG: Check your console to see what is being sent
      console.log("Sending data...", Object.fromEntries(dataToSend));

      // 👇 POTENTIAL FIX: Changed URL from /users to /api/users
      // If this still gives 404, check your backend server.js file.
      const response = await fetch("https://mern-user-app-ir5o.onrender.com/api/users", {
        method: "POST",
        headers: {
            // ⚠️ Do NOT set 'Content-Type': 'multipart/form-data' manually here.
            // The browser sets it automatically with the correct 'boundary' when using FormData.
            'auth-token': localStorage.getItem('token')
        },
        body: dataToSend,
      });

      if (response.ok) {
        alert("✅ User & Image Saved!");
        setFormData({ name: "", age: "", email: "", city: "" });
        setImage(null);
        // window.location.reload(); // Optional: Reloads page
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert("❌ Error Saving User: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("❌ Network Error. Check console.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="form-container">
        
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
          type="text" name="city" placeholder="City"
          value={formData.city} onChange={handleChange} required
        />

        {/* Image Upload Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Profile Picture:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} 
            style={{ border: "none" }}
          />
        </div>

        <button type="submit" className="btn-add">Add User</button>

      </form>
    </div>
  );
}

export default UserForm;