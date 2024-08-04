import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Link } from 'react-router-dom';

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
        {/* Hidden input to trick password managers */}
        <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
        <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />
        <input
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="input"
          autoComplete="new-password"
        />
      </div>
      {strength && (
        <div className="mt-4">
          <p>Score: {strength.score} / 4</p>
          <p>Feedback:</p>
          <ul className="list-disc pl-5">
            {strength.feedback.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
          {strength.feedback.warning && <p className="mt-2 text-yellow-600">{strength.feedback.warning}</p>}
          {strength.score === 4 && (
            <div className="mt-4">
              <p className="text-green-600 font-bold">Congratulations! You have successfully created a strong password.</p>
              <Link to="/" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                Finish
              </Link>
            </div>
          )}
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
