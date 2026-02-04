import { useState } from "react";

function UserForm({ showToast, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    city: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast?.("Please fill all required fields correctly", "error");
      return;
    }

    setLoading(true);

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
        showToast?.("User & Image Saved Successfully!", "success");
        setFormData({ name: "", age: "", email: "", city: "" });
        setImage(null);
        setErrors({});
        onUserAdded?.();
      } else {
        showToast?.("Error Saving User", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast?.("Network Error - Please try again", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-full bg-[#1e293b] p-6 rounded-xl border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">➕ Add New User</h2>
        <p className="text-slate-400 text-sm">Create a new user profile</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        
        {/* Input Grid - 4 Columns in Single Row */}
        <div className="grid grid-cols-4 gap-4 w-full">
          <div className="input-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={formData.name} 
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="input-group">
            <input 
              type="number" 
              name="age" 
              placeholder="Age" 
              value={formData.age} 
              onChange={handleChange}
              className={errors.age ? "input-error" : ""}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
          
          <div className="input-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type="text" 
              name="city" 
              placeholder="City"
              value={formData.city} 
              onChange={handleChange}
              className={errors.city ? "input-error" : ""}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
        </div>

        {/* File Upload - Full Width */}
        <div className="file-upload-group">
          <label className="file-upload-label">📸 Profile Picture</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} 
            className="file-upload-input"
          />
        </div>


        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "⏳ Saving..." : "✨ Add User"}
        </button>

      </form>
    </div>
  );
}

export default UserForm;