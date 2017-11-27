import React from 'react';
import {Icon, Header, Button, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UploadFailed = () => {
  return (
    <div>
      <Segment vertical>
        <Icon name="close" color="red" size="huge" />
        <Header as="h1" inverted content="There was a problem." />
        <Header 
          as="h3" 
          inverted 
          content="Your story could not be saved. You'll have to start again" 
        />
        <Button 
          size="huge" 
          negative 
          content="Go back" 
          as={Link} 
          to={`/stories`} />
      </Segment>
    </div>
  );
};

export default UploadFailed;