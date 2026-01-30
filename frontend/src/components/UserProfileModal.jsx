import React from 'react';
import { X, Mail, MapPin, Calendar, Hash, Edit2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const UserProfileModal = ({ user, onClose, onEdit }) => {
  // Crash Prevention - Return early if no user
  if (!user) return null;

  // Safe property access with fallbacks
  const userName = user.name || 'Unknown User';
  const userEmail = user.email || 'No email provided';
  const userCity = user.city || 'No city provided';
  const userAge = user.age || 'N/A';
  const userStatus = user.status || 'Inactive';
  const userId = user._id ? user._id.substring(0, 12) : 'Unknown';
  const userImage = user.image || 'https://via.placeholder.com/150';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="profile-close-btn" onClick={onClose} aria-label="Close profile">
          <X size={20} />
        </button>

        {/* Gradient Banner */}
        <div className="profile-banner"></div>

        {/* Avatar (Overlapping Banner) */}
        <div className="profile-avatar-wrapper">
          <img 
            src={userImage} 
            alt={userName} 
            className="profile-avatar"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="profile-content">
          {/* Name & Status */}
          <div className="profile-header">
            <h2 className="profile-name">{userName}</h2>
            <StatusBadge status={userStatus} />
          </div>

          {/* Details Grid */}
          <div className="profile-details">
            <div className="detail-item">
              <div className="detail-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                <Mail size={18} style={{ color: '#3b82f6' }} />
              </div>
              <div className="detail-text">
                <span className="detail-label">Email</span>
                <span className="detail-value">{userEmail}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                <MapPin size={18} style={{ color: '#10b981' }} />
              </div>
              <div className="detail-text">
                <span className="detail-label">City</span>
                <span className="detail-value">{userCity}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                <Calendar size={18} style={{ color: '#f59e0b' }} />
              </div>
              <div className="detail-text">
                <span className="detail-label">Age</span>
                <span className="detail-value">{userAge} {userAge !== 'N/A' ? 'years old' : ''}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.2)' }}>
                <Hash size={18} style={{ color: '#a855f7' }} />
              </div>
              <div className="detail-text">
                <span className="detail-label">User ID</span>
                <span className="detail-value">{userId}...</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="profile-footer">
            {onEdit && (
              <button 
                className="btn-edit-profile" 
                onClick={() => {
                  onClose();
                  onEdit(user);
                }}
                aria-label="Edit profile"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
