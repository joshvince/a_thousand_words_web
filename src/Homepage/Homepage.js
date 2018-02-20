import React from 'react';
import { Grid, Header, Image, Segment, Icon } from 'semantic-ui-react';
import PageHeader from './PageHeader.js';
import PhotoFront from './photofront.jpg';


const Homepage = () => { 
  return (
    <div>
      <PageHeader 
        title='Every photo tells a story'
        subtitle='Some stories deserve to be told'
      />
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