import React from 'react';
import { Dimmer } from "semantic-ui-react";
import Complete from './Complete.js';
import InProgress from './InProgress.js';
import Failed from './Failed.js';

const displayResult = (res, storyId) => {
  switch (res) {
    case true:
      return <Complete storyId={storyId} /> 
    case false:
      return <Failed />
    default:
      return null
  }
}

const Uploader = ({isInProgress, result, storyId}) => {
  return (
    <Dimmer page active>
      {isInProgress ? <InProgress/> : null}
      {displayResult(result, storyId)}
    </Dimmer>
  );
};

export default Uploader;