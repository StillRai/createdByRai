import React, { createContext, useState, useEffect } from 'react';
import storyContent from '../assets/storyContent.json';

// Create a context
export const StoryContext = createContext();

const StoryProvider = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [choices, setChoices] = useState([]);
  const [currentContent, setCurrentContent] = useState(storyContent.chapters[0]);

  useEffect(() => {
    const foundContent = storyContent.chapters.find(chapter => chapter.chapter === currentChapter);
    if (foundContent) {
      setCurrentContent(foundContent);
    } else {
      console.error(`Chapter ${currentChapter} not found in story content.`);
    }
  }, [currentChapter]);

  const makeChoice = (choice) => {
    setChoices([...choices, choice]);
    setCurrentChapter(choice.nextChapter);
  };

  return (
    <StoryContext.Provider value={{ currentChapter, choices, currentContent, makeChoice }}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryProvider;
