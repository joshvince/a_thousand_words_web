import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const styles = {
  container: {padding: '4em'},
  header: {fontSize: '4em'}
}

const StoryFooter = () => {
  return (
    <Segment vertical inverted style={styles.container}>
      <Header as="h1" content="The End" style={styles.header}/>
    </Segment>
  );
};

export default StoryFooter;