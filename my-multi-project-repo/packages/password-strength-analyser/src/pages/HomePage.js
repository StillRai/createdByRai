import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="container">
    <h1 className="text-4xl font-bold mb-8">Password Strength Project</h1>
    <div className="space-y-4 md:space-x-4 md:space-y-0">
      <Link to="/learn" className="button text-white py-2 px-4 rounded hover:bg-pastel-green">
        Learn How to Create Strong Passwords
      </Link>
      <Link to="/analyser" className="button text-white py-2 px-4 rounded hover:bg-pastel-purple">
        Try the Password Strength Analyser
      </Link>
    </div>
  </div>
);

export default HomePage;
