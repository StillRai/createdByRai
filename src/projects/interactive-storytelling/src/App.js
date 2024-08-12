import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import StoryProvider from './contexts/StoryContext';
import StoryPage from './components/story/StoryPage';
import BackArrow from './components/BackArrow';

function App() {
  return (
    <Router>
      <div className="App">
        <BackArrow /> {/* Include the Back Arrow */}
        <main id="main-content" className="p-0 m-0 relative z-10">
          <StoryProvider>
            <StoryPage />
          </StoryProvider>
        </main>
      </div>
    </Router>
  );
}

export default App;
