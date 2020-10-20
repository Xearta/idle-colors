import React from 'react';

const Color = ({ name, amount, mps, cost, handleClick }) => {
  return (
    <>
      <div>{name}</div>
      <div>Amount: {amount}</div>
      <div>${cost}</div>
      <button name={name} onClick={e => handleClick()}>
        Increment by {mps}/s
      </button>
    </>
  );
};

export default Color;
