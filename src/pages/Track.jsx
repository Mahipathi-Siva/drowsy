// src/components/Monitoring.js
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Link, useNavigate } from 'react-router-dom';
import './Track.css';
import {getEmail} from "../lib/localStorage";

const Monitoring = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();

  // Start capturing the camera and sending frames to backend
  const handleStart = async () => {
    // Retrieve email from local storage
    const email = getEmail();

    if (!socketRef.current) {
      // Connect to socket and pass email
      socketRef.current = io(process.env.REACT_APP_API_URL, {
        query: { email }
      });
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      return;
    }

    streamIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");
        if (socketRef.current) {
          socketRef.current.emit("camera_frame", { image: imageData });
        }
      }
    }, 100);

    setIsStreaming(true);
  };

  // Stop capturing frames, call backend /stop_video, and refresh page
  const handleStop = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"/stop_video");
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error stopping video:", error);
    } finally {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsStreaming(false);
      window.location.reload();
    }
  };

  const handleLogout = () => {
    navigate('/logout'); // Redirect to a login page
  };

  return (
    <div className="monitoring-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SafeDrive</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/statistics">Statistics</Link>
          <Link to="/profile">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </nav>

      {/* Monitoring Content */}
      <div className="monitoring-content">
        <div className="monitoring-left">
          <h1>Monitoring</h1>

          {/* Control Buttons */}
          <div className="monitoring-buttons">
            <button
              onClick={handleStart}
              disabled={isStreaming}
              className="start-btn"
            >
              Start Monitoring
            </button>
            <button
              onClick={handleStop}
              disabled={!isStreaming}
              className="stop-btn"
            >
              Stop Monitoring
            </button>
          </div>

          {/* Hidden elements for capturing frames */}
          <div style={{ display: "none" }}>
            <video ref={videoRef} />
            <canvas ref={canvasRef} />
          </div>

          {/* Processed Video Feed from Backend */}
          <div className="video-container">
            {isStreaming ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/video`}
                alt="Live Video Feed"
                className="video-feed"
              />
            ) : (
              <div className="video-placeholder">
                <p>Click "Start Monitoring" to begin the video feed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="alerts-section">
          <h2>Your Alerts</h2>
          <ul className="alerts-list">
            <li>Slept - TIME</li>
            <li>Distracted - TIME</li>
            <li>Yawn - TIME</li>
            <li>Slept - TIME</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;