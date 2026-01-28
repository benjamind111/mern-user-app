import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SkeletonCard from "./SkeletonCard";
import StatusBadge from "./StatusBadge";
import DropdownMenu from "./DropdownMenu";

// Generate random status for users
const getRandomStatus = () => {
  const statuses = ['Active', 'Pending', 'Inactive'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

function UserList({ showToast }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch users (READ)
  const fetchUsers = () => {
    setLoading(true);
    fetch("https://mern-user-app-ir5o.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        // Add random status to each user
        const usersWithStatus = data.map(user => ({
          ...user,
          status: getRandomStatus()
        }));
        setUsers(usersWithStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
        showToast?.("Failed to fetch users", "error");
      });
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
        showToast?.("User deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        showToast?.("Failed to delete user", "error");
      }
    }
  };

  // Handle Edit (UPDATE)
  const handleEdit = async (user) => {
    const newName = prompt("Enter new name:", user.name);
    const newAge = prompt("Enter new age:", user.age);

    if (!newName || !newAge) return;

    try {
      const response = await fetch(`https://mern-user-app-ir5o.onrender.com/api/users/${user._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ name: newName, age: newAge }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((u) => (u._id === user._id ? { ...updatedUser, status: user.status } : u)));
        showToast?.("User updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showToast?.("Failed to update user", "error");
    }
  };

  const handleView = (user) => {
    showToast?.(`Viewing ${user.name}'s profile`, "info");
  };

  // Filter users based on debounced search
  const filteredUsers = users.filter((user) => {
    if (debouncedSearch === "") return true;
    return (
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (user.city && user.city.toLowerCase().includes(debouncedSearch.toLowerCase()))
    );
  });

  return (
    <div className="users-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Team Members</h2>
          <p className="section-subtitle">{users.length} registered users</p>
        </div>
        
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="user-grid">
        {loading ? (
          // Show skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-profile-card">
              <div className="card-header-row">
                <StatusBadge status={user.status} />
                <DropdownMenu
                  onView={() => handleView(user)}
                  onEdit={() => handleEdit(user)}
                  onDelete={() => handleDelete(user._id)}
                />
              </div>

              <div className="avatar-container">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="user-avatar"
                />
              </div>
              
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-detail">
                  <span className="detail-icon">🎂</span>
                  {user.age} years old
                </p>
                <p className="user-detail">
                  <span className="detail-icon">📧</span>
                  {user.email}
                </p>
                <p className="user-detail">
                  <span className="detail-icon">🏙️</span>
                  {user.city}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No users found matching "{debouncedSearch}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;