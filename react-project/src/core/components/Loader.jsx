import React from 'react';
import '../css/Loader.css'; // Create this CSS file for loader styling

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;