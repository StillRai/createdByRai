import React from 'react';

const Lesson3Part3 = ({ nextLesson, prevLesson }) => (
  <div className="p-8">
    <h3 className="text-xl font-bold mb-2">Combine Techniques</h3>
    <p className="mb-4">
      Combining these techniques can further enhance your password's security. For example, you can create a passphrase and then substitute some of the letters with numbers and symbols:
    </p>
    <p className="mb-4">
      Example: <strong>"RunningOnTheBeach!"</strong> could be transformed into <strong>"Runn1ng0nTh3B3@ch!"</strong>
    </p>
    <p className="mb-4">
      Remember, the goal is to create passwords that are long, complex, and unique to each of your accounts. Avoid using the same password for multiple sites, and consider using a password manager to keep track of your passwords.
    </p>
    <div className="flex justify-between mt-4">
      <button onClick={prevLesson} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
        Back
      </button>
      <button onClick={nextLesson} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ml-4">
        Next
      </button>
    </div>
  </div>
);

export default Lesson3Part3;
