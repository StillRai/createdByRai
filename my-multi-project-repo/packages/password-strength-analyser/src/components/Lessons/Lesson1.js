import React from 'react';

const Lesson1 = ({ nextLesson }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Why Strong Passwords Matter</h2>
    <p className="mb-4">
      A strong password is crucial for protecting your online accounts from unauthorized access. It reduces the risk of your data being stolen or compromised.
    </p>
    <button onClick={nextLesson} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
      Next
    </button>
  </div>
);

export default Lesson1;
