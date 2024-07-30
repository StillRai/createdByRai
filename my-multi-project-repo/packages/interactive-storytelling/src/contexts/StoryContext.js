import React, { createContext, useState, useEffect } from 'react';
import storyContent from '../assets/storyContent.json';

// Create a context
export const StoryContext = createContext();

const StoryProvider = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState(() => {
    // Check if there's a saved chapter in localStorage
    const savedChapter = localStorage.getItem('currentChapter');
    return savedChapter ? JSON.parse(savedChapter) : 1;
  });
  const [choices, setChoices] = useState([]);
  const [currentContent, setCurrentContent] = useState(() => {
    // Load the initial content based on the saved chapter or the first chapter
    const savedChapter = localStorage.getItem('currentChapter');
    const initialChapter = savedChapter ? JSON.parse(savedChapter) : 1;
    return storyContent.chapters.find(chapter => chapter.chapter === initialChapter);
  });

  useEffect(() => {
    // Save the current chapter to localStorage whenever it changes
    localStorage.setItem('currentChapter', JSON.stringify(currentChapter));

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

  const resetStory = () => {
    localStorage.removeItem('currentChapter');
    setCurrentChapter(1);
    setChoices([]);
  };

  return (
    <StoryContext.Provider value={{ currentChapter, choices, currentContent, makeChoice, resetStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryProvider;
