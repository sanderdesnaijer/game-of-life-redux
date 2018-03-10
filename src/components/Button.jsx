import React, { Component } from 'react';

const Button = ({ activeLabel, inActiveLabel, isActive, onClick }) => {
  const clickBtn = () => {
    onClick(!isActive);
  };
  return (
    <div className="input input--button" onClick={clickBtn}>
      <button>{isActive ? activeLabel : inActiveLabel}</button>
    </div>
  );
};

export default Button;
