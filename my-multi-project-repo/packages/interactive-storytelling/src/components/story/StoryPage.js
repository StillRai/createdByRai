import React, { useContext } from 'react';
import { StoryContext } from '../../contexts/StoryContext';
import Choice from './Choice';

const StoryPage = () => {
  const { currentContent, makeChoice } = useContext(StoryContext);

  return (
    <div className="story-page">
      {currentContent.image && (
        <img 
          src={require(`../../assets/images/${currentContent.image}`)} 
          alt="Story Scene" 
          className="story-image"
        />
      )}
      <h1>{currentContent.text}</h1>
      <div className="choices">
        {currentContent.choices && currentContent.choices.map((choice, index) => (
          <Choice key={index} choice={choice} onClick={() => makeChoice(choice)} />
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
