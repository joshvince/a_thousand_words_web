import React from 'react';
import { Header, Button, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UploadComplete = ({storyId}) => {
  return (
    <div>
      <Segment vertical>
        <Icon name="check" color="green" size="huge" />
        <Header as="h1" inverted content="Success!" />
        <Header as="h3" inverted content="Your story was successfully saved" />
        <Button 
          size="huge" 
          positive 
          content="View now" 
          as={Link} 
          to={`/stories/${storyId}`} />
      </Segment>
    </div>
  );
};

export default UploadComplete;