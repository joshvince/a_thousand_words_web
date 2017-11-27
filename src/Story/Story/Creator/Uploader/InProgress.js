import React from 'react';
import { Loader } from 'semantic-ui-react';

const UploadLoader = () => {
  return (
    <div>
      <Loader 
        size="huge" 
        content="Uploading your story... This may take some time" 
        indeterminate
      />
    </div>
  );
};

export default UploadLoader;