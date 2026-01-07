import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch users (READ)
  const fetchUsers = () => {
    fetch("https://mern-user-app-ir5o.onrender.com/users")
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
        await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
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
      const response = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      <div className="user-grid"> {/* 👈 New Class */}
        
        {users.map((user) => (
          <div key={user._id} className="user-card"> {/* 👈 New Class */}
            <p><strong>👤 Name:</strong> {user.name}</p>
            <p><strong>🎂 Age:</strong> {user.age}</p>
            <p><strong>📧 Email:</strong> {user.email}</p>
            <p><strong>🏙️ City:</strong> {user.city}</p>

            
            <div className="btn-group"> {/* 👈 New Class */}
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