import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoaded(true);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Adjust speed by changing the interval time

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader-container ${loaded ? 'loaded' : ''}`}>
           <div className="loader-percentage">
        {progress}%
      </div>
    </div>
  );
};

export default Loader;
