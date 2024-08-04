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
    <div className="App bg-gradient-to-t from-color-gradient-end to-color-gradient-start">
      <div className="story-page">
        <div className="story-content">
          <p className="story-text">{currentContent.text}</p>
          <h1>{currentContent.title}</h1>

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
        <button className="restart-button" onClick={resetStory}>Restart</button>
      </div>
    </div>
  );
};

export default StoryPage;
