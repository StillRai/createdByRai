import React from 'react';

const DragAndDropQuiz = ({ nextLesson }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Test Your Knowledge</h2>
    <p className="mb-4">Drag and drop the elements below to form components of a strong password.</p>
    {/* Implementation of drag-and-drop elements */}
    <button onClick={nextLesson} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
      Next
    </button>
  </div>
);

export default DragAndDropQuiz;
