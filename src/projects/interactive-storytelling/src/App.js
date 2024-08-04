import React from 'react';
import './App.css';
import StoryProvider from './contexts/StoryContext';
import StoryPage from './components/story/StoryPage';


function App() {
  return (
    <div className="App">
      <StoryProvider>
        <StoryPage />
      </StoryProvider>
    </div>
  );
}

export default App;
