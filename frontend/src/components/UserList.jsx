import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SkeletonCard from "./SkeletonCard";
import StatusBadge from "./StatusBadge";
import DropdownMenu from "./DropdownMenu";
import EditUserModal from "./EditUserModal";
import UserProfileModal from "./UserProfileModal";

// Generate random status for users
const getRandomStatus = () => {
  const statuses = ['Active', 'Pending', 'Inactive'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

function UserList({ showToast, viewMode = 'grid', filterRole = 'all' }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

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

  // Handle Edit - Open Modal
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Handle Save from Modal
  const handleSave = (updatedUser) => {
    setUsers(users.map((u) => 
      u._id === updatedUser._id 
        ? { ...updatedUser, status: u.status } 
        : u
    ));
  };

  const handleView = (user) => {
    setViewingUser(user);
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


      {/* Conditional Rendering: List View (Table) or Grid View (Cards) */}
      {viewMode === 'list' ? (
        // LIST VIEW - RESPONSIVE TABLE
        <div className="table-container">
          {loading ? (
            <div className="table-loading">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    {/* User Column: Avatar + Name */}
                    <td>
                      <div className="table-user-cell">
                        <img 
                          src={user.image} 
                          alt={user.name} 
                          className="table-avatar"
                        />
                        <span className="table-user-name">{user.name}</span>
                      </div>
                    </td>
                    
                    {/* Age */}
                    <td className="table-detail">{user.age} years</td>
                    
                    {/* City */}
                    <td className="table-detail">{user.city}</td>
                    
                    {/* Email */}
                    <td className="table-email">{user.email}</td>
                    
                    {/* Status Badge */}
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    
                    {/* Actions */}
                    <td>
                      <DropdownMenu
                        onView={() => handleView(user)}
                        onEdit={() => handleEdit(user)}
                        onDelete={() => handleDelete(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No users found matching "{debouncedSearch}"</p>
            </div>
          )}
        </div>
      ) : (
        // GRID VIEW - CARDS
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
      )}

      {/* View Profile Modal */}
      {viewingUser && (
        <UserProfileModal
          user={viewingUser}
          onClose={() => setViewingUser(null)}
          onEdit={(user) => {
            setViewingUser(null);
            setEditingUser(user);
          }}
        />
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
          showToast={showToast}
        />
      )}
    </div>
  );
}

export default UserList;