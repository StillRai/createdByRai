import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnPasswordStrength from './pages/LearnPasswordStrength';
import PasswordAnalyzerPage from './pages/PasswordAnalyserPage';
import Lesson1 from './components/Lessons/Lesson1';
import Lesson2 from './components/Lessons/Lesson2';
import Lesson3 from './components/Lessons/Lesson3';
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
        return <Lesson3 nextLesson={() => updateLesson(4)} prevLesson={() => updateLesson(2)} />;
      case 4:
        return <DragAndDropQuiz nextLesson={() => updateLesson(0)} prevLesson={() => updateLesson(3)} />;
      default:
        return <HomePage startCourse={() => updateLesson(1)} />;
    }
  };

  return (
    <Router>
      <div className="container"> {/* Add container class */}
        <Routes>
          <Route path="/" element={renderLesson(currentLesson)} />
          <Route path="/learn" element={<LearnPasswordStrength />} />
          <Route path="/analyze" element={<PasswordAnalyzerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
