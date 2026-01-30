import React, { useState } from 'react';
import { User, Moon, Sun, Shield, Bell, Save, Upload } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, toggleTheme } = useTheme();

  // Profile Settings State
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@userflow.com',
    avatar: null
  });

  // Password Settings State
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReport: true,
    securityAlerts: true
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast?.('Profile updated successfully!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      showToast?.('Passwords do not match', 'error');
      return;
    }
    if (passwords.new.length < 6) {
      showToast?.('Password must be at least 6 characters', 'error');
      return;
    }
    showToast?.('Password changed successfully!', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    showToast?.('Notification settings updated', 'success');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? <Moon size={18} /> : <Sun size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> }
  ];

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account preferences and settings</p>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="settings-layout">
        {/* Tabs Sidebar */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'settings-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="settings-section-title">Profile Settings</h2>
              <p className="settings-section-subtitle">Update your personal information</p>

              <form onSubmit={handleSaveProfile} className="settings-form">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Profile Picture</label>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfile({ ...profile, avatar: e.target.files[0] })}
                      className="file-upload-input"
                    />
                    <Upload size={16} />
                    <span>{profile.avatar ? profile.avatar.name : 'Choose a file'}</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  <Save size={16} />
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2 className="settings-section-title">Appearance</h2>
              <p className="settings-section-subtitle">Customize how UserFlow looks</p>

              <div className="theme-selector">
                <div className="theme-option" onClick={toggleTheme}>
                  <div className="theme-option-header">
                    {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                    <div>
                      <h3>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</h3>
                      <p>Currently active theme</p>
                    </div>
                  </div>
                  <button className="btn-toggle">
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2 className="settings-section-title">Security</h2>
              <p className="settings-section-subtitle">Keep your account secure</p>

              <form onSubmit={handleChangePassword} className="settings-form">
                <div className="input-group">
                  <label className="input-label">Current Password</label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">New Password</label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>

                <button type="submit" className="btn-primary">
                  <Shield size={16} />
                  Change Password
                </button>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="settings-section-title">Notifications</h2>
              <p className="settings-section-subtitle">Choose what you want to be notified about</p>

              <div className="notification-settings">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Email Alerts</h3>
                    <p>Receive email notifications for important updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={() => handleNotificationToggle('emailAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Push Notifications</h3>
                    <p>Get push notifications in your browser</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.pushNotifications}
                      onChange={() => handleNotificationToggle('pushNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Weekly Report</h3>
                    <p>Receive weekly analytics and insights</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReport}
                      onChange={() => handleNotificationToggle('weeklyReport')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Security Alerts</h3>
                    <p>Get notified about security events</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.securityAlerts}
                      onChange={() => handleNotificationToggle('securityAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
