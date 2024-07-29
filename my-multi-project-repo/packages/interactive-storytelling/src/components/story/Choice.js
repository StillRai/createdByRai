import React from 'react';

const Choice = ({ choice, onClick }) => {
  return (
    <button
      className="choice-button"
      onClick={onClick}
    >
      {choice.text}
    </button>
  );
};

export default Choice;
