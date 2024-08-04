import React from 'react';
import PasswordStrengthAnalyser from '../components/PasswordStrengthAnalyser';

const PasswordAnalyserPage = ({ history }) => (
  <div className="container">
    <PasswordStrengthAnalyser />
    <div className="flex justify-between mt-4">
      <button onClick={() => history.push('/learn')} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
        Back
      </button>
    </div>
  </div>
);

export default PasswordAnalyserPage;
