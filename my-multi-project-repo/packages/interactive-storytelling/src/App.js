// App.js
import React from 'react';
import './App.css';  

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StoryProvider from './contexts/StoryContext';
import StoryPage from './components/story/StoryPage';

function App() {
  return (
    <div className="App">
      <Header />
      <StoryProvider>
        <StoryPage />
      </StoryProvider>
      <Footer />
    </div>
  );
}

export default App;
