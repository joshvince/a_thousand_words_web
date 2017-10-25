import React from 'react';

import './LocationSelector.css';

const LocationOption = ({clickHandler, optionName, activeClass, text}) => {
  return (
    <div className="column flex-center-row">
      <div className={`option-tile flex-center-col ${activeClass}`} 
            onClick={e => {clickHandler(optionName)}}>
        {text}
      </div>
  </div>
  );
};

export default LocationOption;