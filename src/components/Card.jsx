import React from 'react';
//import './Card.css'; // Create and style this file as needed

const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
