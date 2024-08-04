import React from 'react';

const Lesson3 = ({ nextLesson }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Strengthening Your Passwords Further</h2>
    <p className="mb-4">
      To make your passwords even stronger, consider using advanced techniques like passphrases or substituting letters with numbers and symbols.
    </p>
    <button onClick={nextLesson} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
      Next
    </button>
  </div>
);

export default Lesson3;
