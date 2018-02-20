import React, { Component } from 'react';
import {Container, Header, Segment } from 'semantic-ui-react';

import ArchiveView from './ArchiveView.js';
import StoryApi from '../Api/StoryApi.js';

const styles = {
  pageContainer: {
    marginTop: '6em', padding: '2em 0em'
  },
  pageHeader: {
    fontSize: '3em'
  }
}

class ArchiveContainer extends Component {
  constructor(props){
    super(props)
    this.state = {storyList: []}
  }
  componentWillMount = () => {
    StoryApi.getStoriesByUser(this.props.currentUser.id).then(resp => {
      this.setState({ storyList: resp.Items })
    })
  }
  componentDidMount = () => window.scrollTo(0,0);
    
  render() {
    return (
      <div style={styles.pageContainer}>
        <Segment vertical basic>
          <Header as='h1' style={styles.pageHeader}>
            {`${this.props.currentUser.name}'s Archive`}
          </Header>
        </Segment>
        <Container >
          <ArchiveView storyList={this.state.storyList} />
        </Container>
      </div>
    );
  }
}

export default ArchiveContainer;