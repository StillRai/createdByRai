import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnPasswordStrength from './pages/LearnPasswordStrength';
import PasswordAnalyzerPage from './pages/PasswordAnalyserPage';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn" element={<LearnPasswordStrength />} />
      <Route path="/analyze" element={<PasswordAnalyzerPage />} />
    </Routes>
  </Router>
);

export default App;
