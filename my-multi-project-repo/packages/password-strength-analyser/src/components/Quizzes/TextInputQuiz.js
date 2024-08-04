import React, { useState } from 'react';

const TextInputQuiz = ({ nextLesson }) => {
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const feedbackMessage = validatePassword(password);
    if (feedbackMessage) {
      setFeedback(feedbackMessage);
    } else {
      setFeedback('');
      nextLesson();
    }
  };

  const validatePassword = (password) => {
    if (password.length < 12) {
      return 'Password must be at least 12 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must include at least one number.';
    }
    if (!/[\W_]/.test(password)) {
      return 'Password must include at least one symbol.';
    }
    return '';
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
      {feedback && (
        <div className="mt-4 text-red-500">
          {feedback}
        </div>
      )}
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
        Submit
      </button>
    </div>
  );
};

export default TextInputQuiz;
