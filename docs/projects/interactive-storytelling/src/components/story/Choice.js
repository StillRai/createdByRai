import React, { useRef } from 'react';

const Choice = ({ choice, onClick, playHoverAudio, stopAudio }) => {
  const lastPlayedRef = useRef(Date.now());

  const handleMouseEnter = () => {
    const now = Date.now();
    if (now - lastPlayedRef.current > 3000) {
      stopAudio(); 
      playHoverAudio(choice.hoverAudio);
      lastPlayedRef.current = now;
    }
  };

  return (
    <button
      className="choice-button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
    >
      {choice.text}
    </button>
  );
};

export default Choice;
