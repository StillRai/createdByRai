import React from 'react';

const Lesson3 = ({ nextLesson, prevLesson }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Strengthening Your Passwords Further</h2>
    <p className="mb-4">
      To make your passwords even stronger, consider using advanced techniques such as passphrases or substituting letters with numbers and symbols. Let's delve into these methods:
    </p>

    <h3 className="text-xl font-bold mb-2">1. Use Passphrases</h3>
    <p className="mb-4">
      A passphrase is a sequence of words or other text used to control access to a computer system, program, or data. Passphrases are generally longer than passwords, making them harder to crack. Here's how to create a strong passphrase:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Combine unrelated words: <strong>"blue apple river dance"</strong></li>
      <li>Use a mix of upper and lower case letters: <strong>"Blue Apple River Dance"</strong></li>
      <li>Add numbers and symbols: <strong>"Blu3 @pple Riv3r D@nc3!"</strong></li>
    </ul>
    <p className="mb-4">
      Example: <strong>"TrickyFoxesD@nc3InTheSun#2023"</strong>
    </p>

    <h3 className="text-xl font-bold mb-2">2. Substitute Letters with Numbers and Symbols</h3>
    <p className="mb-4">
      Another technique is to replace certain letters in your password with numbers or symbols. This method adds complexity and makes your password harder to guess. Here are some common substitutions:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li><strong>A</strong> becomes <strong>4</strong> or <strong>@</strong></li>
      <li><strong>E</strong> becomes <strong>3</strong></li>
      <li><strong>I</strong> becomes <strong>1</strong> or <strong>!</strong></li>
      <li><strong>O</strong> becomes <strong>0</strong></li>
      <li><strong>S</strong> becomes <strong>$</strong></li>
      <li><strong>T</strong> becomes <strong>7</strong></li>
    </ul>
    <p className="mb-4">
      Example: <strong>"P@$$w0rd123!"</strong> could be transformed into <strong>"P@$$w0rd!23#"</strong>
    </p>

    <h3 className="text-xl font-bold mb-2">3. Combine Techniques</h3>
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

export default Lesson3;
