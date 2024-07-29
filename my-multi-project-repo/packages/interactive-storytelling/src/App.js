import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StoryPage from './components/story/StoryPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<StoryPage />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
