import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        color: #000;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      header h1 {
        margin: 0;
        font-size: 24px;
      }
      nav a {
        margin: 0 15px;
        text-decoration: none;
        color: #000;
        font-size: 16px;
      }
      nav .button {
        padding: 10px 20px;
        background-color: #37b24d;
        color: #fff;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
      }
      .hero {
        text-align: center;
        padding: 100px 50px;
        background-color: #e8f5e9;
      }
      .hero h2 {
        font-size: 36px;
        margin-bottom: 20px;
      }
      .hero p {
        font-size: 18px;
        color: #555;
      }
      .buttons {
        margin-top: 20px;
      }
      .buttons a {
        margin: 0 10px;
        padding: 10px 20px;
        background-color: #37b24d;
        color: #fff;
        border-radius: 5px;
        text-decoration: none;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 30px;
        gap: 30px;
      }
      .content-matter {
        width: 50%;
      }
      .content h3 {
        font-size: 24px;
        margin-bottom: 15px;
      }
      .content p {
        font-size: 16px;
        color: #555;
        line-height: 1.5;
      }
      .detection-section {
        padding: 40px 20px;
        background-color: #eef2f3;
      }
      .detection-section h2 {
        font-size: 28px;
        text-align: center;
        margin-bottom: 20px;
      }
      .features, .content {
        padding: 50px 0;
      }
      .detection-section .features {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
      }
      .detection-section .feature {
        flex: 1;
        text-align: center;
        max-width: 350px;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .detection-section .feature img {
        max-width: 100%;
        border-radius: 10px;
      }
      .detection-section .feature h3 {
        font-size: 20px;
        margin-top: 15px;
      }
      .detection-section .feature p {
        font-size: 14px;
        color: #555;
        margin-top: 10px;
      }
      .testimonial {
        padding: 40px 20px 60px;
        text-align: center;
        background-color: #f9f9f9;
      }
      .testimonial h3 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      .testimonial p {
        font-size: 16px;
        color: #555;
        margin: 15px 0;
      }
      .testimonial img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
      .testimonial .user {
        margin: 10px 0;
        font-size: 18px;
        font-weight: bold;
      }
      .newsletter {
        text-align: center;
        padding: 40px 20px 60px;
        background-color: #eef2f3;
      }
      .newsletter input[type="email"] {
        padding: 10px;
        font-size: 16px;
        width: 250px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .newsletter button {
        padding: 10px 20px;
        background-color: #37b24d;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
      footer {
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      footer .column {
        flex: 1;
        margin: 10px;
      }
      footer .column h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }
      footer .column a {
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        display: block;
        margin: 5px 0;
      }
    `;
    // Append the style element to the head
    document.head.appendChild(style);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <header>
        <h1>SafeDrive</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>
      <div className="hero">
        <h2>Stay alert while driving with DriveAlert.</h2>
        <p>Get real-time feedback and notifications for safer driving.</p>
        <div className="buttons">
          <a href="#">Learn More</a>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="content">
        <div className="content-matter">
          <h3>Unlock the Power of Drowsiness Detection</h3>
          <p>
            Our drowsiness detection technology enhances safety by monitoring
            driver alertness in real-time. This proactive approach helps prevent
            accidents caused by fatigue.
          </p>
        </div>
        <img
          src="/images/pht4.jpg"
          alt="Driver Alert Image"
          style={{ height: "250px", width: "auto" }}
        />
      </div>
      <div className="detection-section">
        <h2>Stay Awake with Our Detection Technology</h2>
        <div className="features">
          <div className="feature">
            <img src="/images/pht3.jpg" alt="Real-Time Monitoring" />
            <h3>Facial Recognition & Eye Tracking</h3>
            <p>
              Continuously track driver behavior to detect signs of drowsiness.
            </p>
          </div>
          <div className="feature">
            <img src="/images/yawning.jpg" alt="Instant Alerts" />
            <h3>Yawning Detection</h3>
            <p>
              Monitors mouth movements to detect frequent yawning, a strong
              indicator of drowsiness.
            </p>
          </div>
          <div className="feature">
            <img src="/images/pht2.jpg" alt="Instant Alerts" />
            <h3>Instant Alerts to Prevent Accidents</h3>
            <p>
              Receive immediate notifications when drowsiness is detected.
            </p>
          </div>
        </div>
      </div>
      <div className="testimonial">
        <img src="/images/pht1.jpg" alt="John Doe" />
        <p className="user">John Doe, Fleet Manager</p>
        <h3>Stay Alert, Drive Safe</h3>
        <p>
          Discover how our technology keeps you aware and focused on the road
          ahead.
        </p>
        <div className="buttons">
          <a href="signup.html" className="button">
            Get Started
          </a>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
      <div className="newsletter">
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get the latest updates on features and releases.</p>
        <form>
          <input type="email" placeholder="Your email here" />
          <button type="submit">Join</button>
        </form>
      </div>
      <footer>
        <div className="column">
          <h4>Quick Links</h4>
          <a href="#">Home Page</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="column">
          <h4>Connect With Us</h4>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">YouTube</a>
        </div>
        <div className="column">
          <p>&copy; 2023 Drowsiness Detection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
