import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';

const PasswordStrengthAnalyser = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(zxcvbn(pwd));
  };
 
  const handleBack = () => {
    navigate('/');
  };

  const handleFinish = () => {
    navigate('/summary');
  };

  // Function to mask the password
  const maskPassword = (pwd) => {
    return '•'.repeat(pwd.length);
  };

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">Password Strength Analyser</h2>
      <div className="input-container">
        <input
          type="text"
          value={maskPassword(password)}
          onChange={(e) => {
            // Only update if the length has increased
            if (e.target.value.length > password.length) {
              setPassword(password + e.target.value.slice(-1));
              setStrength(zxcvbn(password + e.target.value.slice(-1)));
            } else if (e.target.value.length < password.length) {
              // Handle backspace
              const newPassword = password.slice(0, -1);
              setPassword(newPassword);
              setStrength(zxcvbn(newPassword));
            }
          }}
          placeholder="Enter your password"
          className="input"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
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
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={handleBack} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
          Back
        </button>
        {strength && strength.score === 4 && (
          <button onClick={handleFinish} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordStrengthAnalyser;