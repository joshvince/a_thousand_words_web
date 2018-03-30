import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

const styles = {
  container: {margin: '5em 0em'},
  title: {fontSize: '3em', marginBottom: '1em'},
  description: {fontSize: '1.3em'}
}

const StoryText = ({storyText}) => {
  return (
    <Container fluid>
      <Segment vertical textAlign="center" style={styles.container}>
        <Header as="h1" content={storyText.headline} style={styles.title}/>
        <Container text textAlign="center">
          <p style={styles.description}>{storyText.description}</p>
        </Container>
      </Segment>
    </Container>
  );
};

export default StoryText;
