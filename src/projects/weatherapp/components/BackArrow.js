import React from 'react';
import { useNavigate } from 'react-router-dom';
import feather from 'feather-icons';

const BackArrow = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    feather.replace(); 
  }, []);

  return (
    <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '50' }}>
      <button onClick={() => navigate('/')} className="flex items-center text-light hover:text-gray-300 transition duration-200">
        <i data-feather="arrow-left" className="mr-2"></i> Back
      </button>
    </div>
  );
};

export default BackArrow;
