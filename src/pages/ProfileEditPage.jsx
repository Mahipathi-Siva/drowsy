import React, { useState } from 'react';
import './ProfileEdit.css';
import { getEmail, getToken } from "../lib/localStorage";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone_number: '',
    vehicle_number: '',
  });
  const [message, setMessage] = useState(''); // For displaying success/error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(FormData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(`${e.target.name} uploaded:`, file);
    // You can handle file uploads separately if needed
  };

  const handleLogout = () => {
    console.log('Logged out');
    // Add your logout logic here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    // Prepare the data for the API call (only include fields with values)
    const requestData = {};
    if (formData.email) requestData.email = formData.email;
    if (formData.name) requestData.name = formData.name;
    if (formData.phone_number) requestData.phone_number = formData.phone_number;
    if (formData.vehicle_number) requestData.vehicle_number = formData.vehicle_number;

    // If no data to send, show an error
    if (Object.keys(requestData).length === 0) {
      setMessage('Please provide at least one field to update.');
      return;
    }
    const token=getToken();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/user/edit_profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("datad",data);

      if (response.ok) {
        setMessage(data.message || 'Profile updated successfully!');
        console.log('Updated user data:', data.user);
        // Update formData with the returned user data
        setFormData({
          email: '',
          name: '',
          phone_number: '',
          vehicle_number: '',
        });
      } else {
        setMessage(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="profile-edit-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SafeDrive</div>
        <div className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/track">Track</a>
          <a href="/profile">Profile</a>
          <a href="/logout">
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
          </a>
        </div>
      </nav>

      {/* Profile Edit Form */}
      <div className="form-container">
        <h1>Profile Details</h1>
        <p className="subtitle">UPDATE PERSONAL INFORMATION</p>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                placeholder="your@email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>PHONE NUMBER</label>
              <input
                type="tel"
                name="phone_number" // Map to phone_number in state
                placeholder="+(*) *** *** ***"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                name="name" // Map to name in state
                placeholder="First Last"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>VEHICLE NUMBER</label>
              <input
                type="text"
                name="vehicle_number"
                placeholder="AB12CD3456"
                value={formData.vehicle_number}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="upload-buttons">
            <input
              type="file"
              id="aadharCard"
              name="Aadhar Card"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="aadharCard" className="upload-btn">
              Upload AadharCard
            </label>

            <input
              type="file"
              id="panCard"
              name="PAN Card"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="panCard" className="upload-btn">
              Upload PANCard
            </label>

            <input
              type="file"
              id="driverLicense"
              name="Driver License"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="driverLicense" className="upload-btn">
              Upload Driver License
            </label>
          </div>

          {/* Submit Button */}
          <div className="submit-button">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;