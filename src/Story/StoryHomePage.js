import React from 'react';
import {Container, Header, Segment } from 'semantic-ui-react';

import Archive from './Archive.js'

const StoryHomePage = ({currentUser}) => {
  return (
    <div style={{padding: '2em 0em'}}>
      <Segment vertical basic>
        <Header 
          as='h1' 
          content={`${currentUser.name}'s Stories`} 
          style={{fontSize: '3em'}}
        />
      </Segment>
      <Container >
        <Archive storyList={[
                            {title: "First", description: "A first story"}, 
                            {title: "second", description: "A second story"},
                            {title: "new", description: "new story"}
                          ]} />
      </Container>
    </div>
  );
};

export default StoryHomePage;