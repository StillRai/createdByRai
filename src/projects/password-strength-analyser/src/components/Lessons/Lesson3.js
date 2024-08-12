import React, { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import lesson3_1Audio from '../../assets/audio/lesson3_1.mp3';
import feather from 'feather-icons';

const Lesson3Part1 = ({ nextLesson, prevLesson }) => {
  const { isPlaying, toggleAudio, stopAudio } = useContext(AudioContext);

  return (
    <div className="mobile-scroll-container">
      <div className="content-container">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Strengthening Your Passwords Further</h2>
          <button onClick={() => toggleAudio(lesson3_1Audio)} className="audio-toggle-button">
            {isPlaying ? (
              <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-x'].toSvg({ width: 24, height: 24 }) }} />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-2'].toSvg({ width: 24, height: 24 }) }} />
            )}
          </button>
        </div>
        <p className="mb-4">
          To make your passwords even stronger, consider using advanced techniques such as passphrases or substituting letters with numbers and symbols. Let's delve into these methods:
        </p>
        <h3 className="text-xl font-bold mb-2">Use Passphrases</h3>
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

export default Lesson3Part1;
