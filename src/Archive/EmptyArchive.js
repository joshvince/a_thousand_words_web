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

const EmptyArchive = ({header, subheader, url, iconName}) => {
  return (
    <Container>
      <Header 
        style={styles.header} 
        color="blue" 
        icon
        as={Link}
        to={url}
      >
        <Icon name={iconName} size="huge" color="blue"/>
        {header}
      <Header.Subheader style={styles.text}>
        {subheader}
      </Header.Subheader>
      </Header>
    </Container>
  );
};

export default EmptyArchive;