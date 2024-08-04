import React, { useState } from 'react';

const MultipleChoiceQuiz = ({ nextLesson }) => {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    // Implement logic to check if the answer is correct
    nextLesson();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Common Password Mistakes Quiz</h2>
      <p className="mb-4">Which of the following is a weak password?</p>
      <div>
        <label>
          <input type="radio" name="question1" value="a" onChange={() => setSelected('a')} /> qwerty123
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="question1" value="b" onChange={() => setSelected('b')} /> P@ssw0rd!123
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="question1" value="c" onChange={() => setSelected('c')} /> Myp@ssw0rd2021
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="question1" value="d" onChange={() => setSelected('d')} /> Tr0ub4dor&3
        </label>
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
        Submit
      </button>
    </div>
  );
};

export default MultipleChoiceQuiz;
