import React, { Component } from 'react';

const Button = ({ label, onClick }) => {
  return (
    <div className="input input--button" onClick={onClick}>
      <button>{label}</button>
    </div>
  );
};

export default Button;
