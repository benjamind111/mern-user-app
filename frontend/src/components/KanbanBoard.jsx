import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Loader } from 'lucide-react';
import { API_URL } from '../config/api';

const KanbanBoard = ({ showToast }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'Pending', title: 'Pending', color: '#f59e0b' },
    { id: 'Active', title: 'Active', color: '#10b981' },
    { id: 'Inactive', title: 'Inactive', color: '#6b7280' }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users`);
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast?.('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      console.log('🔄 Updating user status:', { userId, newStatus });
      
      // Get token inside function to ensure it's current
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('❌ No auth token found');
        showToast?.('Authentication required - please login', 'error');
        return false;
      }
      
      console.log('🔑 Token found:', token.substring(0, 20) + '...');
      
      const response = await fetch(
        `${API_URL}/api/users/update-status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token  // Changed from Authorization: Bearer to match VerifyToken.js
          },
          body: JSON.stringify({ 
            userId: userId, 
            status: newStatus 
          })
        }
      );

      const data = await response.json();
      console.log('📡 API Response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('✅ Status updated successfully');
        showToast?.(data.message || `User moved to ${newStatus}`, 'success');
        return true;
      } else {
        console.error('❌ API returned error:', data);
        showToast?.(data.error || 'Failed to update status', 'error');
        return false;
      }
    } catch (error) {
      console.error('🔥 Network error:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      showToast?.(`Network error: ${error.message}`, 'error');
      return false;
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    console.log('🎯 Drag ended:', { source, destination, draggableId });

    // Dropped outside any droppable
    if (!destination) {
      console.log('⚠️ Dropped outside droppable area');
      return;
    }

    // Dropped in the same column
    if (source.droppableId === destination.droppableId) {
      console.log('⚠️ Dropped in same column');
      return;
    }

    const newStatus = destination.droppableId;
    const userId = draggableId;

    // Find the user being moved
    const movedUser = users.find(u => u._id === userId);
    if (!movedUser) {
      console.error('❌ User not found:', userId);
      return;
    }

    console.log('👤 Moving user:', { name: movedUser.name, from: source.droppableId, to: newStatus });

    // Store original state for potential revert
    const originalUsers = [...users];

    // Optimistic update - update UI immediately
    const updatedUsers = users.map(user =>
      user._id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    console.log('✨ Optimistic update applied');

    // Send API request in background
    const success = await updateUserStatus(userId, newStatus);

    // Revert on failure
    if (!success) {
      console.log('🔄 Reverting changes due to API failure');
      setUsers(originalUsers);
      showToast?.('Changes reverted due to error', 'error');
    }
  };

  const getUsersByStatus = (status) => {
    return users.filter(user => (user.status || 'Pending') === status);
  };

  if (loading) {
    return (
      <div className="kanban-loading">
        <Loader className="spinner" size={48} />
        <p>Loading workflow board...</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div 
        className="kanban-board"
        style={{
          height: 'calc(100vh - 220px)',
          overflowY: 'hidden', // Prevent board from scrolling
          overflowX: 'auto',   // Allow horizontal scroll if needed
          display: 'flex'
        }}
      >
        {columns.map(column => {
          const columnUsers = getUsersByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className="kanban-column"
              style={{ 
                borderTopColor: column.color,
                height: '100%' // Take full parent height
              }}
            >
              {/* Column Header */}
              <div 
                className="kanban-column-header"
                style={{ backgroundColor: `${column.color}15` }}
              >
                <div className="kanban-column-title">
                  <span 
                    className="kanban-status-dot" 
                    style={{ backgroundColor: column.color }}
                  ></span>
                  {column.title}
                </div>
                <span className="kanban-count">{columnUsers.length}</span>
              </div>

              {/* Droppable Column Content */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-column-content ${
                      snapshot.isDraggingOver ? 'drag-over' : ''
                    }`}
                  >
                    {columnUsers.length === 0 ? (
                      <div className="kanban-empty">
                        <p>Drag users here</p>
                      </div>
                    ) : (
                      columnUsers.map((user, index) => (
                        <Draggable
                          key={user._id}
                          draggableId={user._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`kanban-card ${
                                snapshot.isDragging ? 'is-dragging' : ''
                              }`}
                              style={{
                                ...provided.draggableProps.style,
                                // Add rotation when dragging
                                transform: snapshot.isDragging
                                  ? `${provided.draggableProps.style?.transform} rotate(3deg)`
                                  : provided.draggableProps.style?.transform
                              }}
                            >
                              <div className="kanban-card-avatar">
                                <img 
                                  src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`}
                                  alt={user.name}
                                  onError={(e) => {
                                    e.target.src = 'https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff';
                                  }}
                                />
                              </div>
                              <div className="kanban-card-info">
                                <h4>{user.name}</h4>
                                <p>{user.city || 'No city'}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {/* CRITICAL: Placeholder for maintaining space */}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
