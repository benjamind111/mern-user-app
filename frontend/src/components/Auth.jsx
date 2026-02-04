import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { API_URL } from '../config/api';

const Auth = ({ onLogin, showToast }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (isRegistering) {
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else if (!/\d/.test(password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const endpoint = isRegistering ? "register" : "login";
    const URL = `${API_URL}/api/auth/${endpoint}`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          showToast?.("Registration successful! Please login.", "success");
          setIsRegistering(false);
          setPassword("");
        } else {
          // LOGIN SUCCESS
          localStorage.setItem("token", data.token);
          showToast?.("Login successful!", "success");
          onLogin();
        }
      } else {
        // Show error from server
        const errorMessage = data.error || data.message || "Something went wrong";
        showToast?.(errorMessage, "error");
      }
    } catch (error) {
      console.error("Auth error:", error);
      showToast?.("Network error. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">
            {isRegistering ? <UserPlus size={28} /> : <LogIn size={28} />}
          </div>
          <h1 className="auth-title">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="auth-subtitle">
            {isRegistering 
              ? "Sign up to get started with UserFlow" 
              : "Sign in to access your dashboard"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Input */}
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="admin@example.com" 
                value={email} 
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? "input-error" : ""}
                disabled={loading}
              />
            </div>
            {errors.email && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder={isRegistering ? "Min 6 chars, 1 number" : "Enter password"}
                value={password} 
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? "input-error" : ""}
                disabled={loading}
              />
            </div>
            {errors.password && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-auth" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="spinner" size={18} />
                {isRegistering ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              <>
                {isRegistering ? <UserPlus size={18} /> : <LogIn size={18} />}
                {isRegistering ? "Create Account" : "Sign In"}
              </>
            )}
          </button>
        </form>

        {/* Toggle Link */}
        <div className="auth-footer">
          <p className="auth-toggle-text">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button 
            className="auth-toggle-btn" 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrors({});
              setPassword("");
            }}
            disabled={loading}
          >
            {isRegistering ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;