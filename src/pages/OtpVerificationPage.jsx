import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, getEmail } from "../lib/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = getEmail();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Reset and basic styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Poppins', sans-serif;
        background: #eef2f3;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
      }
      /* Container for the OTP verification card */
      .login-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 1000px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      /* Left side image styling */
      .image-container {
        flex: 1;
        background: url('https://source.unsplash.com/featured/?nature,abstract') center/cover no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .image-container img {
        max-width: 100%;
        height: auto;
        opacity: 0.8;
      }
      /* Form container styling */
      .form-container {
        flex: 1;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .form-container h2 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 20px;
      }
      .form-container form {
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
      }
      .form-container form label {
        margin-bottom: 8px;
        color: #555;
        font-size: 0.9rem;
      }
      .form-container form input {
        padding: 12px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
      }
      .form-container form button {
        padding: 12px;
        background-color: #37b24d;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .form-container form button:hover {
        background-color: #2d923e;
      }
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .login-container {
          flex-direction: column;
          width: 100%;
        }
        .image-container, .form-container {
          width: 100%;
        }
        .image-container {
          height: 200px;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"/auth/otp_verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setToken(data.token);
        console.log(data.token)
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/images/Login-bro.png" alt="login" />
      </div>
      <div className="form-container">
        <h2>Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">Enter the OTP sent to your email:</label>
          <input 
            type="text" 
            id="otp" 
            name="otp" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
