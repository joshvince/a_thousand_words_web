import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

const styles = {
  segment: {
    minHeight: 700, 
    padding: '1em 0em'
  },
  title: {
    fontSize: '5em', 
    fontWeight: 'normal', 
    marginBottom: 0, 
    marginTop: '3em'
  },
  subtitle: {
    fontSize: '1.7em', 
    fontWeight: 'normal'
  }
}

const StoryHeader = ({title, subtitle, numberOfPics, button}) => {
  return (
    <Segment textAlign="center" inverted vertical style={styles.segment} >
      <Container>
        <Header as='h1' content={title} inverted style={styles.title}/>
        <Header as='h2' content={subtitle} inverted style={styles.subtitle} />
        <Header as='h3' content={`${numberOfPics} pictures`} inverted style={styles.subtitle} />
        {button}
      </Container>
    </Segment>
  );
};

export default StoryHeader;