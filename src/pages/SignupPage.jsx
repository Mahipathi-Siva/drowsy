import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    license_number: '',
    vehicle_number: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .signup-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        padding: 15px;
      }

      .signup-container {
        width: 100%;
        max-width: 460px;
      }

      .signup-form {
        background: rgba(255, 255, 255, 0.95);
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .form-title {
        color: #4a4a4a;
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 15px;
        text-align: center;
      }

      .error-message {
        background-color: #ffebee;
        color: #d32f2f;
        padding: 8px 12px;
        border-radius: 6px;
        margin-bottom: 15px;
        font-size: 0.85rem;
      }

      .form-group {
        margin-bottom: 12px;
      }

      .form-label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: #555;
        font-size: 0.85rem;
      }

      .form-control {
        width: 100%;
        padding: 8px 12px;
        font-size: 0.9rem;
        color: #333;
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        transition: all 0.2s ease;
        box-sizing: border-box;
      }

      .form-control:focus {
        outline: none;
        border-color: #a777e3;
        background-color: #fff;
        box-shadow: 0 0 0 2px rgba(167, 119, 227, 0.2);
      }

      .form-row {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
      }

      .form-col {
        flex: 1;
      }

      .submit-btn {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        background: linear-gradient(90deg, #6e8efb, #a777e3);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
      }

      .submit-btn:hover {
        box-shadow: 0 4px 8px rgba(110, 142, 251, 0.3);
      }

      .submit-btn:disabled {
        background: #d1d1d1;
        cursor: not-allowed;
      }

      .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid white;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      .signup-footer {
        text-align: center;
        margin-top: 15px;
        color: #666;
        font-size: 0.85rem;
      }

      .signup-footer a {
        color: #6e8efb;
        text-decoration: none;
        font-weight: 500;
      }

      .signup-footer a:hover {
        text-decoration: underline;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @media (max-width: 480px) {
        .signup-form {
          padding: 20px 15px;
        }
        .form-row {
          flex-direction: column;
          gap: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2 className="form-title">Create Account</h2>
          
          {error && <div className="error-message">⚠️ {error}</div>}
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input 
              id="name"
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
              className="form-control"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              id="email"
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              className="form-control"
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="phone_number" className="form-label">Phone Number</label>
              <input 
                id="phone_number"
                type="text" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={handleChange} 
                placeholder="10-digit number" 
                pattern="\d{10}" 
                title="Phone number must be exactly 10 digits"
                className="form-control"
                required 
              />
            </div>
            
            <div className="form-col">
              <label htmlFor="license_number" className="form-label">License Number</label>
              <input 
                id="license_number"
                type="text" 
                name="license_number" 
                value={formData.license_number} 
                onChange={handleChange} 
                placeholder="License number" 
                className="form-control"
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="vehicle_number" className="form-label">Vehicle Number</label>
            <input 
              id="vehicle_number"
              type="text" 
              name="vehicle_number" 
              value={formData.vehicle_number} 
              onChange={handleChange} 
              placeholder="Enter your vehicle number" 
              className="form-control"
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                id="password"
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Create password" 
                className="form-control"
                required 
              />
            </div>
            
            <div className="form-col">
              <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
              <input 
                id="confirm_password"
                type="password" 
                name="confirm_password" 
                value={formData.confirm_password} 
                onChange={handleChange} 
                placeholder="Confirm password" 
                className="form-control"
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="loading-spinner"></span> : "Sign Up"}
          </button>
          
          <div className="signup-footer">
            Already have an account? <a href="/login">Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;