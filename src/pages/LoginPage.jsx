import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setEmails } from "../lib/localStorage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject the CSS styles
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Poppins', sans-serif;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        background: linear-gradient(to bottom, #f5f5f5, #d3d3d3);
      }
      .login-container {
        background: linear-gradient(to bottom, #f5f5f5, #d3d3d3);
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
      }
      .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('https://source.unsplash.com/900x900/?nature,abstract') no-repeat center center/cover;
        height: 100%;
      }
      .image-container img {
        max-width: 60%;
        height: auto;
      }
      .form {
        margin-left: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        text-align: center;
      }
      .form h2 {
        color: #37b24d;
        font-size: 2rem;
        margin-bottom: 20px;
        font-weight: 600;
      }
      .form input[type="email"],
      .form input[type="password"] {
        width: 100%;
        padding: 15px;
        margin: 15px 0;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease-in-out;
        outline: none;
      }
      .form button {
        width: 100%;
        padding: 15px;
        font-size: 1.2rem;
        color: white;
        background-color: #37b24d;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s;
        font-weight: 600;
      }
      .form button:hover {
        background-color: #2d923e;
        transform: scale(1.05);
      }
      .signup-link {
        margin-top: 15px;
        font-size: 1rem;
        color: #34495e;
      }
      .signup-link a {
        color: #37b24d;
        text-decoration: none;
        font-weight: bold;
      }
      .signup-link a:hover {
        text-decoration: underline;
      }
      .error {
        color: red;
        margin-bottom: 10px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseMessage(null); // Clear any previous messages
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Store the userId (if returned) for later use
        setEmails(email);
        // Navigate to the OTP verification page
        navigate("/otp");
      } else {
        // Display error or response message returned by the API
        setResponseMessage(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setResponseMessage("Login failed. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Image */}
      <div className="image-container">
        <img src="/images/Login-bro.png" alt="login" />
      </div>

      {/* Right Side - Form */}
      <div className="form">
        <h2>Login</h2>
        {responseMessage && <p className="error">{responseMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
