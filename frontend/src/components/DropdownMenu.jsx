import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';

const DropdownMenu = ({ onEdit, onDelete, onView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="More actions"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {onView && (
            <button className="dropdown-item" onClick={() => handleAction(onView)}>
              <Eye size={16} />
              <span>View Profile</span>
            </button>
          )}
          <button className="dropdown-item" onClick={() => handleAction(onEdit)}>
            <Edit2 size={16} />
            <span>Edit</span>
          </button>
          <button className="dropdown-item dropdown-item-danger" onClick={() => handleAction(onDelete)}>
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
