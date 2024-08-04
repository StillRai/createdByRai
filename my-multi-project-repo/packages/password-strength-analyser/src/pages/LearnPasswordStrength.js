import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lesson1 from '../components/Lessons/Lesson1';
import Lesson2 from '../components/Lessons/Lesson2';
import Lesson3 from '../components/Lessons/Lesson3';
import DragAndDropQuiz from '../components/Quizzes/DragAndDropQuiz';
import MultipleChoiceQuiz from '../components/Quizzes/MultipleChoiceQuiz';
import TextInputQuiz from '../components/Quizzes/TextInputQuiz';

const LearnPasswordStrength = () => {
  const [step, setStep] = useState(1);

  const nextLesson = () => setStep(step + 1);
  const prevLesson = () => setStep(step - 1);

  return (
    <div className="container">
      {step === 1 && <Lesson1 nextLesson={nextLesson} />}
      {step === 2 && <DragAndDropQuiz nextLesson={nextLesson} prevLesson={prevLesson} />}
      {step === 3 && <Lesson2 nextLesson={nextLesson} prevLesson={prevLesson} />}
      {step === 4 && <MultipleChoiceQuiz nextLesson={nextLesson} prevLesson={prevLesson} />}
      {step === 5 && <Lesson3 nextLesson={nextLesson} prevLesson={prevLesson} />}
      {step === 6 && <TextInputQuiz nextLesson={nextLesson} prevLesson={prevLesson} />}
      {step === 7 && (
        <div className="content">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <p className="mb-4">You’ve completed the lessons. Now you can test your password strength.</p>
          <Link to="/analyser" className="button text-white py-2 px-4 rounded hover:bg-pastel-green">
            Go to Password Strength Analyser
          </Link>
        </div>
      )}
      {step > 1 && step < 7 && (
        <div className="flex justify-between mt-4">
       
        </div>
      )}
    </div>
  );
};

export default LearnPasswordStrength;
