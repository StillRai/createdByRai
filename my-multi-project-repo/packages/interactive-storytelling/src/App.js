import React from 'react';
import './App.css';
import StoryProvider from './contexts/StoryContext';
import StoryPage from './components/story/StoryPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

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
