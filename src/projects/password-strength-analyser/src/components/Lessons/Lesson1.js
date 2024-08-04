import React from 'react';

const Lesson1 = ({ nextLesson, prevLesson }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Passwords: Your Digital Bodyguards</h2>
    <p className="mb-4">
      Passwords might not be the most thrilling topic, but they're very important in this age of technological advancement. Just as technology advances, so do the skills of hackers.
    </p>
    <p className="mb-4">
      Take a moment to think about all the things you have stored online. Emails, bank details, maybe even embarrasing videos that you'd rather keep hidden away. A solid password is your first line of defense against digital criminals.
    </p>
    <p className="mb-4">
      Before we dive in, let's break down some password security jargon:
      <br></br>      <br></br>

      <ul className="list-disc ml-6">
        <li><strong>Brute Force Attacks:</strong> A method where attackers try every possible combination of characters to guess a password.</li>
        <li><strong>Phishing:</strong> A technique where attackers trick you into revealing your passwords by pretending to be a trustworthy entity in an electronic communication.</li>
        <li><strong>Credential Stuffing:</strong> A type of cyber-attack where attackers use a list of known username and password combinations to gain unauthorised access to accounts.</li>
      </ul>
    </p>
    <p className="mb-4">
      In the next few lessons, we'll uncover common password no-nos, teach you to craft strong passwords, and share some tips to keep your online presence more secure.
    </p>
    <div className="flex justify-between mt-4">
    
      <button onClick={nextLesson} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
        Let's Keep Rolling!
      </button>
    </div>
  </div>
);

export default Lesson1;
