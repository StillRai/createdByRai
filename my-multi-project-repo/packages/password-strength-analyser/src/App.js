import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnPasswordStrength from './pages/LearnPasswordStrength';
import PasswordStrengthAnalyser from './components/PasswordStrengthAnalyser';
import Lesson1 from './components/Lessons/Lesson1';
import Lesson2 from './components/Lessons/Lesson2';
import Lesson3Part1 from './components/Lessons/Lesson3';
import Lesson3Part2 from './components/Lessons/Lesson3_2';
import Lesson3Part3 from './components/Lessons/Lesson3_3';
import DragAndDropQuiz from './components/Quizzes/DragAndDropQuiz';

const App = () => {
  const [currentLesson, setCurrentLesson] = useState(0);

  useEffect(() => {
    const savedLesson = localStorage.getItem('currentLesson');
    if (savedLesson) {
      setCurrentLesson(parseInt(savedLesson, 10));
    }
  }, []);

  const updateLesson = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
    localStorage.setItem('currentLesson', lessonIndex);
  };

  const renderLesson = (lessonIndex) => {
    switch (lessonIndex) {
      case 1:
        return <Lesson1 nextLesson={() => updateLesson(2)} prevLesson={() => updateLesson(0)} />;
      case 2:
        return <Lesson2 nextLesson={() => updateLesson(3)} prevLesson={() => updateLesson(1)} />;
      case 3:
        return <Lesson3Part1 nextLesson={() => updateLesson(4)} prevLesson={() => updateLesson(2)} />;
      case 4:
        return <Lesson3Part2 nextLesson={() => updateLesson(5)} prevLesson={() => updateLesson(3)} />;
      case 5:
        return <Lesson3Part3 nextLesson={() => updateLesson(6)} prevLesson={() => updateLesson(4)} />;
      case 6:
        return <DragAndDropQuiz nextLesson={() => updateLesson(7)} prevLesson={() => updateLesson(5)} />;
      case 7:
        return <PasswordStrengthAnalyser prevLesson={() => updateLesson(6)} />;
      default:
        return <HomePage startCourse={() => updateLesson(1)} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={renderLesson(currentLesson)} />
        <Route path="/learn" element={<LearnPasswordStrength />} />
        <Route path="/analyser" element={<PasswordStrengthAnalyser />} />
      </Routes>
    </Router>
  );
};

export default App;
