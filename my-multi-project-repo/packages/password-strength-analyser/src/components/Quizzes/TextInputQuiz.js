import React, { useState } from 'react';

const TextInputQuiz = ({ nextLesson }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Implement logic to check if the password meets criteria
    nextLesson();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Create a Strong Password</h2>
      <p className="mb-4">Create a password that meets the following criteria:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>At least 12 characters long</li>
        <li>Includes uppercase letters</li>
        <li>Includes lowercase letters</li>
        <li>Includes numbers</li>
        <li>Includes symbols</li>
      </ul>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="input border border-gray-300 p-2 rounded w-full"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
        Submit
      </button>
    </div>
  );
};

export default TextInputQuiz;
