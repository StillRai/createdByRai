import React, { useState } from 'react';

const MultipleChoiceQuiz = ({ nextLesson, prevLesson }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = () => {
    setShowResult(true);
    setIsCorrect(selectedAnswer === "correct-answer");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Multiple Choice Quiz</h2>
      <p className="mb-4">Which of the following is a strong password component?</p>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            value="correct-answer"
            checked={selectedAnswer === "correct-answer"}
            onChange={() => setSelectedAnswer("correct-answer")}
          />
          &nbsp; A mix of uppercase, lowercase, numbers, and special characters
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            value="incorrect-answer-1"
            checked={selectedAnswer === "incorrect-answer-1"}
            onChange={() => setSelectedAnswer("incorrect-answer-1")}
          />
          &nbsp; Your birthdate
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            value="incorrect-answer-2"
            checked={selectedAnswer === "incorrect-answer-2"}
            onChange={() => setSelectedAnswer("incorrect-answer-2")}
          />
          &nbsp; Your pet's name
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            value="incorrect-answer-3"
            checked={selectedAnswer === "incorrect-answer-3"}
            onChange={() => setSelectedAnswer("incorrect-answer-3")}
          />
          &nbsp; A single dictionary word
        </label>
      </div>
      {showResult && (
        <div className={`mt-4 p-4 ${isCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
          {isCorrect ? 'Correct! This is a component of a strong password.' : 'Incorrect. Please try again.'}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={prevLesson} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
          Back
        </button>
        <button onClick={handleCheck} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4">
          Check
        </button>
        {isCorrect && (
          <button onClick={nextLesson} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ml-4">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;
