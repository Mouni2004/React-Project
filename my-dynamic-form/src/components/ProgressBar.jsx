import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div style={{ width: `${progress}%` }} className="progress" />
  </div>
);

export default ProgressBar;
