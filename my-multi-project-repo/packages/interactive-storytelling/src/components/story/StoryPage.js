import React, { useContext } from 'react';
import { StoryContext } from '../../contexts/StoryContext';
import Choice from './Choice';
import backgroundImage from '../../assets/images/st_bg1.png'; // Adjust the path as necessary

// Dynamically import all images from the assets/images directory
const images = {};
const importAll = (r) => r.keys().forEach((key) => (images[key.replace('./', '')] = r(key)));
importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));

const StoryPage = () => {
  const { currentContent, makeChoice, resetStory } = useContext(StoryContext);

  // Determine the correct image to display
  const getImage = (image) => {
    return images[image] || null;
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div className="story-page">
        <div className="story-content">
          <h1>{currentContent.title}</h1>
          <p className="story-text">{currentContent.text}</p>
        </div>
        <div className="story-body">
          {currentContent.image && (
            <img src={getImage(currentContent.image)} alt="Chapter illustration" className="story-image" />
          )}
          <div className="buttons">
            {currentContent.choices && currentContent.choices.map((choice, index) => (
              <Choice key={index} choice={choice} onClick={() => makeChoice(choice)} />
            ))}
          </div>
        </div>
        <button className="choice-button" onClick={resetStory}>Restart</button>
      </div>
    </div>
  );
};

export default StoryPage;
