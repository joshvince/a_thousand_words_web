import React from 'react';
import {Icon, Header, Button, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UploadFailed = ({redirectUrl}) => {
  return (
    <div>
      <Segment vertical>
        <Icon name="close" color="red" size="huge" />
        <Header as="h1" inverted content="There was a problem." />
        <Header 
          as="h3" 
          inverted 
          content="We couldn't save that right now." 
        />
        <Button 
          size="huge" 
          negative 
          content="Go back" 
          as={Link} 
          to={redirectUrl} />
      </Segment>
    </div>
  );
};

export default UploadFailed;