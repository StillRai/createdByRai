import React, { useContext } from 'react';
import { StoryContext } from '../../contexts/StoryContext';
import Choice from './Choice';
import ch1Image from '../../assets/images/ch-1.png'; // Adjust the path as necessary
import backgroundImage from '../../assets/images/st_bg1.png'; // Adjust the path as necessary

const StoryPage = () => {
  const { currentContent, makeChoice } = useContext(StoryContext);

  // Determine the correct image to display
  const getImage = (image) => {
    switch (image) {
      case 'assets/images/ch-1.png':
        return ch1Image;
      // Add cases for other images as needed
      default:
        return null;
    }
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
        {currentContent.image && (
          <img src={getImage(currentContent.image)} alt="Chapter illustration" className="story-image" />
        )}
        <h1>{currentContent.title}</h1>
        <p className="story-text">{currentContent.text}</p>
        <div className="choices">
          {currentContent.choices && currentContent.choices.map((choice, index) => (
            <Choice key={index} choice={choice} onClick={() => makeChoice(choice)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
