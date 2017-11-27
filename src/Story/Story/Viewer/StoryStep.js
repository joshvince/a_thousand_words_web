import React from 'react';
import { Image, Segment, Container, Header } from 'semantic-ui-react';

const styles = {
  container: {margin: '5em 0em'},
  title: {fontSize: '3em', marginBottom: '1em'},
  description: {fontSize: '1.3em'}
}

const StoryStep = ({step}) => {
  return (
    <Container fluid>
      <Image fluid src={step.image.url} />
      <Segment vertical textAlign="center" style={styles.container}>
        <Header as="h1" content={step.headline} style={styles.title}/>
        <Container text>
          <p style={styles.description}>{step.description}</p>
        </Container>
      </Segment>
    </Container>
  );
};

export default StoryStep;
