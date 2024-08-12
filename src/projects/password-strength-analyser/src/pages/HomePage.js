import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ startCourse }) => (
  <div className="container">
    <h1 className="title-style font-bold mb-8">Password Strength Project</h1>
    <div className="space-y-4 md:space-x-4 md:space-y-0">
         <Link to="/learn" className="button text-white py-2 px-4 rounded">
        Learn How to Create Strong Passwords
      </Link>
      <Link to="/analyser" className="button text-white py-2 px-4 rounded">
        Try the Password Strength Analyser
      </Link>
    </div>
  </div>
);

export default HomePage;
