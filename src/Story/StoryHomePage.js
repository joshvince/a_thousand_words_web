import React, { Component } from 'react';
import {Container, Header, Segment } from 'semantic-ui-react';

import Archive from './Archive/Archive.js';
import StoryApi from '../Api/StoryApi.js';

class StoryHomePage extends Component {
  constructor(props){
    super(props)
    this.state = {storyList: []}
  }
  componentWillMount(){
    StoryApi.getStoriesByUser(this.props.currentUser.id).then(resp => {
      this.setState({ storyList: resp.Items })
    })
  }
  render() {
    return (
      <div style={{padding: '2em 0em'}}>
        <Segment vertical basic>
          <Header 
            as='h1' 
            content={`${this.props.currentUser.name}'s Stories`} 
            style={{fontSize: '3em'}}
          />
        </Segment>
        <Container >
          <Archive storyList={this.state.storyList} />
        </Container>
      </div>
    );
  }
}

export default StoryHomePage;