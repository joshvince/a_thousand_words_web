import React from 'react';
import '../App.css';

const ErrorMessage = ({message}) => {
  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;