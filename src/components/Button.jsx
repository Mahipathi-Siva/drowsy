import React from 'react';
//import './Button.css'; // Create and style this file as needed

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
