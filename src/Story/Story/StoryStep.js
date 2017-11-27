import React from 'react';
import { Image, Segment, Container, Header } from 'semantic-ui-react';

const styles = {
  container: {margin: '3em 0em'},
  title: {fontSize: '3em'}
}

const StoryStep = ({step}) => {
  return (
    <Container fluid>
      <Image fluid src={step.image.url} />
      <Segment vertical textAlign="center" style={styles.container}>
        <Header as="h1" content={step.headline} style={styles.title}/>
        <Container text>
          {step.description}
        </Container>
      </Segment>
    </Container>
  );
};

export default StoryStep;
