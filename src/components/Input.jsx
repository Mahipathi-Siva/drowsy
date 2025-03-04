import React from 'react';
//import './Input.css'; // Create and style this file as needed

const Input = ({ label, value, onChange, type = 'text', placeholder, name }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input 
         type={type} 
         id={name}
         name={name}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
