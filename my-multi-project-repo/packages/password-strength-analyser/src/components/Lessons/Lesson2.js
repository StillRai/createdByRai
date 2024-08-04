import React from 'react';

const Lesson2 = ({ nextLesson, prevLesson }) => (
  <div className="p-4 md:p-6 lg:p-8">
    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Avoiding Common Password Mistakes</h2>
    <p className="text-base md:text-lg lg:text-xl mb-4">
      Even if you use a mix of characters, certain habits can still weaken your password. Avoid these common mistakes to ensure your passwords remain strong and secure.
    </p>
    <ul className="list-disc ml-4 md:ml-6 lg:ml-8 mb-4 text-base md:text-lg lg:text-xl">
      <li className="mb-2"><strong>Using Easily Guessable Information:</strong> Avoid using information that can be easily guessed or found online, such as your name, birthdate, or common words.</li>
      <li className="mb-2"><strong>Repeating Characters or Patterns:</strong> Refrain from using repetitive characters (e.g., "aaa") or sequential patterns (e.g., "1234" or "abcd"). These are easy for attackers to predict.</li>
      <li className="mb-2"><strong>Using Common Passwords:</strong> Do not use common passwords such as "password," "123456," or "qwerty." These are among the first passwords attackers will try.</li>
      <li className="mb-2"><strong>Keeping the Same Password for Multiple Accounts:</strong> Using the same password across multiple sites increases the risk if one site is compromised. Always use unique passwords for different accounts.</li>
      <li className="mb-2"><strong>Ignoring Password Length:</strong> Ensure your password is long enough to provide adequate security. A strong password is typically at least 12 characters long.</li>
      <li className="mb-2"><strong>Not Updating Passwords Regularly:</strong> Regularly update your passwords to protect against potential breaches. Change your passwords every few months, especially for critical accounts.</li>
      <li className="mb-2"><strong>Not Using a Password Manager:</strong> Managing passwords can be challenging. Consider using a password manager to generate and store complex passwords securely.</li>
    </ul>
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

export default Lesson2;
