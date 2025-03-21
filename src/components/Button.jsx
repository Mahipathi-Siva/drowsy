import React from 'react';
import './Button.css'; // Import the styles

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
