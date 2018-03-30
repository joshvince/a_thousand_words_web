import React from 'react';
import './App.css';

const ClearNavContainer = ({children}) => {
  return (
    <div className="clear-nav-container">
      {children}
    </div>
  );
};

export default ClearNavContainer;