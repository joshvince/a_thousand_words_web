import React from 'react';
import { Dimmer } from "semantic-ui-react";
import Complete from './Complete.js';
import InProgress from './InProgress.js';
import Failed from './Failed.js';

const displayResult = (res, redirectRoot, objectId) => {
  let url;
  switch (res) {
    case true:
      url = `${redirectRoot}/${objectId}`
      return <Complete redirectUrl={url} /> 
    case false:
      url = redirectRoot
      return <Failed redirectUrl={url}/>
    default:
      return null
  }
}

const Uploader = ({isInProgress, result, redirectRoot, objectId}) => {
  return (
    <Dimmer page active>
      {isInProgress ? <InProgress /> : null}
      {displayResult(result, redirectRoot, objectId)}
    </Dimmer>
  );
};

export default Uploader;