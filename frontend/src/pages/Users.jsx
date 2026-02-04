import React, { useState } from 'react';
import { Grid, List, Filter, Kanban } from 'lucide-react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import KanbanBoard from '../components/KanbanBoard';

const Users = ({ showToast }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', or 'board'
  const [filterRole, setFilterRole] = useState('all'); // 'all', 'admin', 'user'

  return (
    <div className="w-full min-w-full pl-6 pt-6 pb-6 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Team Management</h1>
          <p className="text-slate-400">Manage your team members and permissions</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Filter Dropdown - only show in grid/list view */}
          {viewMode !== 'board' && (
            <div className="filter-dropdown">
              <Filter size={18} />
              <select 
                value={filterRole} 
                onChange={(e) => setFilterRole(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Users</option>
                <option value="admin">Admins Only</option>
                <option value="user">Users Only</option>
              </select>
            </div>
          )}

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'view-btn-active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === 'board' ? 'view-btn-active' : ''}`}
              onClick={() => setViewMode('board')}
              title="Board View"
            >
              <Kanban size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Rendering based on view mode */}
      {viewMode === 'board' ? (
        <KanbanBoard showToast={showToast} />
      ) : (
        <>
          {/* Add User Form - Full Width */}
          <UserForm showToast={showToast} onUserAdded={() => window.location.reload()} />

          {/* User List with Grid/List View - Full Width */}
          <UserList showToast={showToast} viewMode={viewMode} filterRole={filterRole} />
        </>
      )}
    </div>
  );
};

export default Users;
