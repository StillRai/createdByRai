import React, { useContext, useEffect, useRef, useState } from 'react';
import { StoryContext } from '../../contexts/StoryContext';
import Choice from './Choice';
import { Volume2, VolumeX } from 'react-feather';

// Dynamically import all images from the assets/images directory
const images = {};
const importAllImages = (r) => r.keys().forEach((key) => (images[key.replace('./', '')] = r(key)));
importAllImages(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));

// Dynamically import all audio from the assets/audio directory
const audioFiles = {};
const importAllAudio = (r) => r.keys().forEach((key) => (audioFiles[key.replace('./', '')] = r(key)));
importAllAudio(require.context('../../assets/audio', false, /\.(mp3|wav)$/));

const StoryPage = () => {
  const { currentContent, makeChoice, resetStory } = useContext(StoryContext);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const audioRef = useRef(null);
  const hoverAudioRef = useRef(null);

  const getImage = (image) => {
    return images[image] || null;
  };

  const getAudio = (audio) => {
    return audioFiles[audio] || null;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (isAudioOn && currentContent.audio) {
        audioRef.current.src = getAudio(currentContent.audio);
        audioRef.current.play();
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (hoverAudioRef.current) {
        hoverAudioRef.current.pause();
      }
    };
  }, [currentContent, isAudioOn]);

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const playHoverAudio = (audio) => {
    if (hoverAudioRef.current && isAudioOn) {
      hoverAudioRef.current.src = getAudio(audio);
      hoverAudioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (hoverAudioRef.current) {
      hoverAudioRef.current.pause();
    }
  };

  return (
    <div className="App bg-gradient-to-t from-color-gradient-end to-color-gradient-start">
      <div className="story-page">
        <div className="story-content">
          <p className="story-text">{currentContent.text}</p>
        </div>
        <div className="story-body">
          {currentContent.image && (
            <img src={getImage(currentContent.image)} alt="Chapter illustration" className="story-image" />
          )}
          <div className="buttons">
            {currentContent.choices && currentContent.choices.map((choice, index) => (
              <Choice
                key={index}
                choice={choice}
                onClick={() => {
                  stopAudio();
                  makeChoice(choice);
                }}
                playHoverAudio={playHoverAudio}
                stopAudio={stopAudio}
              />
            ))}
          </div>
        </div>
        <div className="controls">
          <button className="audio-toggle" onClick={toggleAudio}>
            {isAudioOn ? <Volume2 /> : <VolumeX />}
          </button>
          <button className="restart-button" onClick={resetStory}>Restart</button>
        </div>
        <audio ref={audioRef} />
        <audio ref={hoverAudioRef} />
      </div>
    </div>
  );
};

export default StoryPage;
