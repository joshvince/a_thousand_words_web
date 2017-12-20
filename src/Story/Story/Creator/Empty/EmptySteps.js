import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const EmptySteps = () => {
  return (
    <Segment basic>
      <Header 
        as='h3' 
        content="Your story has nothing in it! You'd better get adding..."
      />
    </Segment>
  );
};

export default EmptySteps;