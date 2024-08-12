import React, { useContext, useEffect, useRef, useState } from 'react';
import { StoryContext } from '../../contexts/StoryContext';
import Choice from './Choice';
import { Volume2, VolumeX, RefreshCw } from 'react-feather';

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

  const stopAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    if (hoverAudioRef.current && !hoverAudioRef.current.paused) {
      hoverAudioRef.current.pause();
    }
  };

  useEffect(() => {
    const handleAudioPlayback = () => {
      if (audioRef.current) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        }
        audioRef.current.currentTime = 0;
        if (isAudioOn && currentContent.audio) {
          audioRef.current.src = getAudio(currentContent.audio);
          audioRef.current.play().catch((error) => {
            console.warn('Audio playback was interrupted:', error);
          });
        }
      }
    };

    handleAudioPlayback();

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
      hoverAudioRef.current.play().catch((error) => {
        console.warn('Hover audio playback was interrupted:', error);
      });
    }
  };

  return (
    <div className="App bg-gradient-to-t from-color-gradient-end to-color-gradient-start">
      <div className="story-page">
        <div className="controls flex justify-end mb-4 w-full space-x-4">
          <button className="audio-toggle group relative" onClick={toggleAudio}>
            {isAudioOn ? <Volume2 /> : <VolumeX />}
            <span className="tooltip group-hover:opacity-100 group-hover:visible">
              {isAudioOn ? 'Disable Transcript' : 'Enable Transcript'}
            </span>
          </button>
          <button className="audio-toggle group relative" onClick={resetStory}>
            <RefreshCw />
            <span className="tooltip group-hover:opacity-100 group-hover:visible">
              Restart Story
            </span>
          </button>
        </div>
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
        <audio ref={audioRef} />
        <audio ref={hoverAudioRef} />
      </div>
    </div>
  );
};

export default StoryPage;
