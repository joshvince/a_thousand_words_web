import React from 'react';
import { Image, Segment, Container, Header } from 'semantic-ui-react';

const styles = {
  container: {margin: '3em 0em'},
  title: {fontSize: '3em'}
}

const StoryStep = ({step}) => {
  return (
    <Container fluid>
      <Image fluid src={step.imageUrl} />
      <Segment vertical container textAlign="center" style={styles.container}>
        <Header as="h1" content={step.info.title} style={styles.title}/>
        <Header as="h2" content={step.info.year} />
        <Container text>
          {step.info.description}
        </Container>
      </Segment>
    </Container>
  );
};

export default StoryStep;
