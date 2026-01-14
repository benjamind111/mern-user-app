import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    city: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // 1. New Loading State

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 2. Start Loading

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('age', formData.age);
    dataToSend.append('email', formData.email);
    dataToSend.append('city', formData.city);
    
    if (image) {
      dataToSend.append('image', image);
    }

    try {
      // Ensure this URL matches your live backend
      const response = await fetch("https://mern-user-app-ir5o.onrender.com/api/users", {
        method: "POST",
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        body: dataToSend,
      });

      if (response.ok) {
        alert("✅ User & Image Saved!");
        setFormData({ name: "", age: "", email: "", city: "" });
        setImage(null);
        window.location.reload(); 
      } else {
        alert("❌ Error Saving User");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Network Error");
    } finally {
      setLoading(false); // 3. Stop Loading (whether it worked or failed)
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

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Profile Picture:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} 
            style={{ border: "none" }}
          />
        </div>

        {/* 4. Dynamic Button: Changes text and disables click while loading */}
        <button type="submit" className="btn-add" disabled={loading}>
          {loading ? "Saving..." : "Add User"}
        </button>

      </form>
    </div>
  );
}

export default UserForm;