import React from 'react';

const Lesson2 = ({ nextLesson }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Avoiding Common Password Mistakes</h2>
    <p className="mb-4">
      Even if you use a mix of characters, certain habits can still weaken your password. Avoid these common mistakes to ensure your passwords remain strong and secure.
    </p>
    <button onClick={nextLesson} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
      Next
    </button>
  </div>
);

export default Lesson2;
