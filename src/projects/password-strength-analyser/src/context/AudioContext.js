import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  const toggleAudio = (src) => {
    if (audio && currentSrc === src) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
      setCurrentSrc(null);
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(src);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
      setCurrentSrc(src);
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
      setCurrentSrc(null);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
