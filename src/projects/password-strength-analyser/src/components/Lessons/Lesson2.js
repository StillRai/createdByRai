import React, { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import lesson2Audio from '../../assets/audio/lesson2.mp3';
import feather from 'feather-icons';

const Lesson2 = ({ nextLesson, prevLesson }) => {
  const { isPlaying, toggleAudio, stopAudio } = useContext(AudioContext);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Avoiding Common Password Mistakes</h2>
        <button onClick={() => toggleAudio(lesson2Audio)} className="audio-toggle-button">
          {isPlaying ? (
            <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-x'].toSvg({ width: 24, height: 24 }) }} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-2'].toSvg({ width: 24, height: 24 }) }} />
          )}
        </button>
      </div>
      <p className="mb-4">
        Even if you use a mix of characters, certain habits can still weaken your password. Avoid these common mistakes to ensure your passwords remain strong and secure.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li className="mb-2"><strong>Using Easily Guessable Information:</strong> Avoid using information that can be easily guessed or found online, such as your name, birthdate, or common words.</li>
        <li className="mb-2"><strong>Repeating Characters or Patterns:</strong> Refrain from using repetitive characters (e.g., "aaa") or sequential patterns (e.g., "1234" or "abcd"). These are easy for attackers to predict.</li>
        <li className="mb-2"><strong>Using Common Passwords:</strong> Do not use common passwords such as "password," "123456," or "qwerty." These are among the first passwords attackers will try.</li>
        <li className="mb-2"><strong>Keeping the Same Password for Multiple Accounts:</strong> Using the same password across multiple sites increases the risk if one site is compromised. Always use unique passwords for different accounts.</li>
        <li className="mb-2"><strong>Ignoring Password Length:</strong> Ensure your password is long enough to provide adequate security. A strong password is typically at least 12 characters long.</li>
        <li className="mb-2"><strong>Not Updating Passwords Regularly:</strong> Regularly update your passwords to protect against potential breaches. Change your passwords every few months, especially for critical accounts.</li>
        <li className="mb-2"><strong>Not Using a Password Manager:</strong> Managing passwords can be challenging. Consider using a password manager to generate and store complex passwords securely.</li>
      </ul>
      <div className="flex justify-between mt-4">
        <button onClick={() => { stopAudio(); prevLesson(); }} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
          Back
        </button>
        <button onClick={() => { stopAudio(); nextLesson(); }} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ml-4">
          Next
        </button>
      </div>
    </div>
  );
};

export default Lesson2;
