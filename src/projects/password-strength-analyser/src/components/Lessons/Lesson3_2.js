import React, { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import lesson3_2Audio from '../../assets/audio/lesson3_2.mp3';
import feather from 'feather-icons';

const Lesson3Part2 = ({ nextLesson, prevLesson }) => {
  const { isPlaying, toggleAudio, stopAudio } = useContext(AudioContext);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold mb-2">Substitute Letters with Numbers and Symbols</h3>
        <button onClick={() => toggleAudio(lesson3_2Audio)} className="audio-toggle-button">
          {isPlaying ? (
            <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-x'].toSvg({ width: 24, height: 24 }) }} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: feather.icons['volume-2'].toSvg({ width: 24, height: 24 }) }} />
          )}
        </button>
      </div>
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

export default Lesson3Part2;
