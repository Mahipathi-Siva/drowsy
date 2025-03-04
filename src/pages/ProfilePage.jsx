import React, { useState, useEffect } from "react";
import { Download, FileText, Info } from "lucide-react";
import { motion } from "framer-motion";
import "./ProfilePage.css"; // Adding CSS import
import { getEmail, getToken } from "../lib/localStorage";
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = getEmail();
  const token= getToken();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    
    // API Call
    fetch("http://127.0.0.1:5000/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch profile data");
        setLoading(false);
      });
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleLogout = () => {
    navigate('/logout'); // Redirect to a login page
  };

  
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <motion.nav 
        className="nav-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-logo">
          <h1 className="logo-text">SafeDrive</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/track" className="nav-link">Track</a>
          <a href="/profile" className="nav-link active">Profile</a>
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </motion.nav>

      {/* Main Content Container */}
      <div className="content-container">
        {/* First Row - 3 Cards */}
        <motion.div
          className="row-container"
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
           {/* Profile Card */}
<motion.div className="card profile-card" variants={fadeIn}>
  <h2 className="card-title">Profile</h2>
  <div className="profile-content">
    <div className="profile-image-container">
      <img
        src={userData?.profile_image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
        alt="User Profile"
        className="profile-image"
      />
    </div>
    <h3 className="profile-name">{userData?.name || "N/A"}</h3>
    <p className="profile-details">Phone: {userData?.phone_number || "N/A"}</p>
    <p className="profile-details">Email: {userData?.email || "N/A"}</p>

    {/* Edit Profile Button */}
    <button 
      className="edit-profile-btn"
      onClick={() => window.location.href = "/profile/edit"}
    >
      Edit Profile
    </button>
  </div>
</motion.div>


          {/* General Information Card */}
<motion.div className="card info-card" variants={fadeIn}>
  <h2 className="card-title">General Information</h2>

  <div className="form-group">
    <div className="form-row">
      <label className="form-label">Date of Birth</label>
      <p className="info-text">{userData?.dob || "DD/MM/YYYY"}</p>
    </div>

    <div className="form-row">
      <label className="form-label">Identification</label>
      <p className="info-text">••••••••••••••••••</p>
    </div>

    <h3 className="section-title">Upcoming Drives</h3>

    <div className="form-row">
      <label className="form-label">Drive From GNT - MCL</label>
      <p className="info-text">{userData?.upcoming_drive_1 || "DD/MM/YYYY"}</p>
    </div>

    <div className="form-row">
      <label className="form-label">Drive from MCL - GNT</label>
      <p className="info-text">{userData?.upcoming_drive_2 || "DD/MM/YYYY"}</p>
    </div>

    <div className="info-icon">
      <Info className="icon" />
    </div>
  </div>
</motion.div>


          {/* Details Card */}
        <motion.div className="card details-card" variants={fadeIn}>
          <h2 className="card-title">Details</h2>
          <h3 className="section-title">Driving Documents</h3>

          <div className="documents-list">
            <div className="document-item">
              <div className="document-name">
                <FileText className="icon" />
                <span>License Number: {userData?.license_number || "N/A"}</span>
              </div>
            </div>

            <div className="document-item">
              <div className="document-name">
                <FileText className="icon" />
                <span>Vehicle Number: {userData?.vehicle_number || "N/A"}</span>
              </div>
            </div>
          </div>
        </motion.div>
        </motion.div>

        {/* Second Row - 2 Cards */}
        <motion.div
          className="row-container"
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Summary Card */}
          <motion.div
            className="card summary-card"
            variants={fadeIn}
          >
            <h2 className="card-title">Summary</h2>
            <div className="wave-container">
              <WaveAnimation />
            </div>
          </motion.div>

          {/* Alerts Card */}
          <motion.div
            className="card alerts-card"
            variants={fadeIn}
          >
            <h2 className="card-title">Your Alerts</h2>

            <div className="alerts-list">
              <ul>
                <motion.li
                  className="alert-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="alert-dot"></div>
                  <span>Slept - TIME</span>
                </motion.li>
                <motion.li
                  className="alert-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="alert-dot"></div>
                  <span>Distracted - Time</span>
                </motion.li>
                <motion.li
                  className="alert-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="alert-dot"></div>
                  <span>Yawn - TIME</span>
                </motion.li>
                <motion.li
                  className="alert-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="alert-dot"></div>
                  <span>Slept - Time</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Wave Animation Component for the Summary Chart
function WaveAnimation() {
  return (
    <div className="wave-animation">
      <svg width="100%" height="100%" viewBox="0 0 800 400">
        <rect width="800" height="400" fill="black" />
        {Array.from({ length: 200 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 800}
            cy={Math.random() * 400}
            r={Math.random() * 2 + 1}
            fill="white"
            initial={{ opacity: 0.1 + Math.random() * 0.9 }}
            animate={{
              y: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1 + Math.random() * 0.9, 0.5 + Math.random() * 0.5, 0.1 + Math.random() * 0.9],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.path
          d="M0,200 C100,100 200,300 300,200 C400,100 500,300 600,200 C700,100 800,300 800,200"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            pathOffset: [0, 0.5, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.path
          d="M0,220 C100,120 200,320 300,220 C400,120 500,320 600,220 C700,120 800,320 800,220"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.5,
            pathOffset: [0, 0.25, 0.5, 0.75, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
}

export default ProfilePage;