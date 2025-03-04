// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmail,getToken, removeToken, removeEmail } from '../lib/localStorage';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const userEmail = getEmail();
      const token=getToken();

      if (!userEmail) {
        // If no email is found in localStorage, proceed with clearing and redirecting
        removeToken();
        removeEmail();
        console.log("Logged out!!");
        navigate('/login');
        return;
      }

      try {
        // Call the logout API
        const response = await fetch(process.env.REACT_APP_API_URL+'/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await response.json();
        console.log("data",data)

        if (response.ok) {
          console.log(data.message); // "Logged out successfully"
        } else {
          console.error('Logout failed:', data.message);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        // Clear localStorage regardless of API success/failure
        removeToken();
        removeEmail();
        navigate('/login'); // Redirect to login page after logout
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Logging out...</h2>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default Logout;