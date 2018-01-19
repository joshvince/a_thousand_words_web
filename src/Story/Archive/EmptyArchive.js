import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Header, Container } from 'semantic-ui-react';

const styles = {
  header: {
    fontSize: '2.5em'
  },
  text: {
    padding: '0.4em',
    fontSize: '0.7em'
  }
}

const EmptyArchive = () => {
  return (
    <Container>
      <Header 
        style={styles.header} 
        color="blue" 
        icon
        as={Link}
        to="/stories/new"
      >
        <Icon name="write" size="huge" color="blue"/>
        You don't have any stories yet
      <Header.Subheader style={styles.text}>
        Click to get started
      </Header.Subheader>
      </Header>
    </Container>
  );
};

export default EmptyArchive;