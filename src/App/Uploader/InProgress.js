import React from 'react';
import { Loader } from 'semantic-ui-react';

const UploadInProgress = () => {
  return (
    <div>
      <Loader 
        size="huge" 
        content="Uploading... This may take some time"
        indeterminate
      />
    </div>
  );
};

export default UploadInProgress;