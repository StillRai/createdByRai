import React from 'react';
import feather from 'feather-icons';

const BackArrow = () => {
  React.useEffect(() => {
    feather.replace(); 
  }, []);

  return (
    <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '50' }}>
      <button
        onClick={() => window.location.href = 'https://www.createdByRai.com'}
        className="flex items-center text-light hover:text-gray-300 transition duration-200 back-button"
      >
        <i data-feather="arrow-left" className="mr-2"></i> Home
      </button>
    </div>
  );
};

export default BackArrow;
