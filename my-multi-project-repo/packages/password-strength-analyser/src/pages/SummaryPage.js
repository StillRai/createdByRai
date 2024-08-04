import React from 'react';
import { Link } from 'react-router-dom';

const SummaryPage = () => (
  <div className="content">
    <h2 className="text-2xl font-bold mb-4 header-summary">Congratulations!</h2>
    <p className="mb-4 header-summary">
      You have successfully completed the course on creating strong passwords. Here's a quick summary of what you've learned:
    </p>
    <ul className="list-disc pl-5 mb-6 space-y-2">
      <li>Use at least 12 characters in your passwords.</li>
      <li>Include uppercase and lowercase letters, numbers, and symbols.</li>
      <li>Avoid easily guessable information and common patterns.</li>
      <li>Consider using passphrases for stronger security.</li>
      <li>Regularly update your passwords and avoid reusing them across different accounts.</li>
    </ul>
    <div className="text-center">
      <Link to="/" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block">
        Back to Home
      </Link>
    </div>
  </div>
);

export default SummaryPage;