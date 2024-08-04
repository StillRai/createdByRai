import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthAnalyser = ({ prevLesson }) => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(zxcvbn(pwd));
  };

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">Password Strength Analyser</h2>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="input"
        />
        <button className="button">Test</button>
      </div>
      {strength && (
        <div className="mt-4">
          <p>Score: {strength.score} / 4</p>
          <p>{strength.feedback.suggestions.join(' ')}</p>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={prevLesson} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
          Back
        </button>
      </div>
    </div>
  );
};

export default PasswordStrengthAnalyser;
