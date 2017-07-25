import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import socket from './Socket/socket';

// Pass in the socket we just imported and send it down to the app component.
ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));
