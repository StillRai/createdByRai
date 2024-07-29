import React from 'react';

const Choice = ({ choice, onClick }) => {
  return (
    <button className="choice-button" onClick={onClick} aria-label={`Choice: ${choice.text}`}>
      {choice.text}
    </button>
  );
};

export default Choice;
