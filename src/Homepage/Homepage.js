import React from 'react';
import {  Button, Container, Grid, Header, Image, Segment, 
          Icon } from 'semantic-ui-react';
import PhotoFront from './photofront.jpg';

const Homepage = () => {
  return (
    <div>
      <Segment
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        vertical
        inverted
      >
        <Container text>
          <Header
            as='h1'
            content='A Thousand Words'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
          />
          <Header
            as='h2'
            content='A place for photos with a story'
            inverted
            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
          />
          <Button primary size="huge">Get Started</Button>
        </Container>
      </Segment>

      <Grid columns={2} container stackable style={{padding: '3em 0em'}}>
        <Grid.Column>
          <Segment textAlign='center' basic>
            <Icon name="quote right" size="huge" />
            <Header as='h2' content='Tell the whole story' />
            <p style={{fontSize: '1.3em'}}>
            Tell the stories behind the photos that mean something to you 
            </p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment textAlign='center' basic>
            <Icon name="users" size="huge" />  
            <Header as='h2' content="And share it" />
            <p style={{fontSize: '1.3em'}}>
            A story is meant to be shared. Create stories and share them easily.
            </p>
          </Segment>
        </Grid.Column>       
      </Grid>

      <Segment vertical>
        <Image fluid src={PhotoFront} />
      </Segment>

    </div>
  );
};

export default Homepage;