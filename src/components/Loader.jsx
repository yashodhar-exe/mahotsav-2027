import React from 'react';
import './Loader.css';
import shurikenImage from '../assets/shuriken.avif';

const Loader = ({ isLoading }) => {
  return (
    <div className={`loader-container ${isLoading ? '' : 'loader-hidden'}`}>
      <div className="loader-content">
        <img src={shurikenImage} alt="Loading..." className="loader-spinner" />
      </div>
    </div>
  );
};

export default Loader;
