import React, { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import lesson3_3Audio from '../../assets/audio/lesson3_3.mp3';
import feather from 'feather-icons';

const Lesson3Part3 = ({ nextLesson, prevLesson }) => {
  const { isPlaying, toggleAudio, stopAudio } = useContext(AudioContext);

  return (
    <div className="mobile-scroll-container">
      <div className="content-container">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold mb-2">Combine Techniques</h3>
          <button onClick={() => toggleAudio(lesson3_3Audio)} className="audio-toggle-button">
            {isPlaying ? (
              <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-x'].toSvg({ width: 24, height: 24 }) }} />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-2'].toSvg({ width: 24, height: 24 }) }} />
            )}
          </button>
        </div>
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
          <button onClick={() => { stopAudio(); prevLesson(); }} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Back
          </button>
          <button onClick={() => { stopAudio(); nextLesson(); }} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 ml-4">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson3Part3;
