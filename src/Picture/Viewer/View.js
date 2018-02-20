import React from 'react';
import {Header, Container, Image} from 'semantic-ui-react';

const styles = {
  pageContainer: {
    marginTop: '10em'
  }
}

const PictureView = ({picture}) => {
  return (
    <Container fluid style={styles.pageContainer}>  
      <Image src={picture.url} centered/>
      <Header as='h2' content={picture.name}/>
    </Container>
  );
};

export default PictureView;