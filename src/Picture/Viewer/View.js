import React from 'react';
import {Header, Container, Image} from 'semantic-ui-react';

const PictureView = ({picture}) => {
  return (
    <Container fluid>
      <Image src={picture.url} centered/>
      <Header as='h2' content={picture.name}/>
    </Container>
  );
};

export default PictureView;