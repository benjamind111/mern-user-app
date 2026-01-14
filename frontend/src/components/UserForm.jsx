import { useState } from "react";

function UserForm() {
  // 1. State to hold the input data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    city: ""
  });

  const [image, setImage] = useState(null); // 👈 New State for file

  // 2. Handle typing in the inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle the Submit button
const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create a "FormData" object (It's like a digital envelope)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('email', email);
    formData.append('city', city);
    if (image) {
      formData.append('image', image); // Put the file in the envelope ✉️
    }

    try {
      const response = await fetch('https://mern-user-app-ir5o.onrender.com/users', {
        method: 'POST',
        headers: {
          // ⚠️ IMPORTANT: Do NOT set 'Content-Type': 'application/json' here!
          // The browser sets the correct 'multipart/form-data' automatically.
          'auth-token': localStorage.getItem('token') 
        },
        body: formData, // Send the envelope!
      });

      if (response.ok) {
        alert("User added successfully!");
        setName(""); setAge(""); setEmail(""); setCity(""); setImage(null); // Reset form
        window.location.reload(); // Reload to show new user
      } else {
        alert("Failed to add user");
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