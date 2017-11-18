import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Image, Segment, Icon } from 'semantic-ui-react';
import PageHeader from '../App/Header/PageHeader.js';
import PhotoFront from './photofront.jpg';


const Homepage = () => {
  const CTAButton = <Button primary size="huge" content="Get Started" as={Link} to="/stories" />
  return (
    <div>
      <PageHeader 
        title='A Thousand Words'
        subtitle='A place for photos with a story'
        button={CTAButton}
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