import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 👈 Add this line

  // Fetch users (READ)
  const fetchUsers = () => {
    fetch("https://mern-user-app-ir5o.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Delete (DELETE)
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`https://mern-user-app-ir5o.onrender.com/api/users/${id}`, { method: "DELETE" });
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Handle Edit (UPDATE)
  const handleEdit = async (user) => {
    const newName = prompt("Enter new name:", user.name);
    const newAge = prompt("Enter new age:", user.age);

    // If user clicked Cancel or didn't type anything, do nothing
    if (!newName || !newAge) return;

    try {
      const response = await fetch(`https://mern-user-app-ir5o.onrender.com/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ name: newName, age: newAge }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // Update the list on the screen without refreshing
        setUsers(users.map((u) => (u._id === user._id ? updatedUser : u)));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

// ... (logic same as before)

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📋 Registered Users</h3>

      {/* 1. PASTE THIS SEARCH BAR HERE 👇 */}
      <div className="search-container" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "300px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div className="user-grid">
        
        {/* 2. CHANGE THIS MAPPING LOGIC 👇 */}
        {users
          .filter((user) => {
             // If search is empty, show everyone
             if (searchTerm === "") return true;
             // Otherwise, check if name or city matches
             return (
               user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (user.city && user.city.toLowerCase().includes(searchTerm.toLowerCase()))
             );
          })
          .map((user) => (
            <div key={user._id} className="user-card">
              <img 
            src={user.image} 
            alt={user.name} 
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} 
          />
              <p><strong>👤 Name:</strong> {user.name}</p>
              <p><strong>🎂 Age:</strong> {user.age}</p>
              <p><strong>📧 Email:</strong> {user.email}</p>
              <p><strong>🏙️ City:</strong> {user.city}</p>

              <div className="btn-group">
                <button onClick={() => handleEdit(user)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="btn-delete">Delete</button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
export default UserList;