import React, { Component } from 'react';
import {Container, Header, Segment, Tab, Dimmer, Loader, Menu } from 'semantic-ui-react';

import StoryArchiveView from './StoryArchive/StoryArchiveView';
import PictureArchiveView from './PictureArchive/PictureArchiveView';
import StoryApi from '../Api/StoryApi';
import PictureApi from '../Api/PictureApi';

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
    this.state = {
      storyList: [],
      pictureList: [],
      displayLoader: true
    }
  }
  componentDidMount = async () => {
    window.scrollTo(0,0)
    let userId = this.props.currentUser.id;
    const stories = await StoryApi.getStoriesByUser(userId);
    const pictures = await PictureApi.getPicturesByUser(userId);
    this.setState({
      storyList: stories.Items,
      pictureList: pictures.Items,
      displayLoader: false
    })
  }
    
  render() {
    let storyArchive = <StoryArchiveView key={1} storyList={this.state.storyList} />
    let pictureArchive = <PictureArchiveView key={2} pictureList={this.state.pictureList} />
    let tabs = [
      {
        menuItem: <Menu.Item key={0}>
                    <Header as='h1' content='Stories'/>
                  </Menu.Item>, 
        render: () => <Tab.Pane content={storyArchive}/>
      },
      {
        menuItem: <Menu.Item key={1}>
                    <Header as='h1' content='Pictures'/>
                  </Menu.Item>,
        render: () => <Tab.Pane content={pictureArchive}/>
      }
    ]
    return (
      <div style={styles.pageContainer}>
        <Dimmer page active={this.state.displayLoader}>
          <Loader size="huge"/>
        </Dimmer>
        {this.state.displayLoader ? null :
          [<Segment vertical basic key={0}>
            <Header as='h1' style={styles.pageHeader}>
              {`${this.props.currentUser.name}'s Archive`}
            </Header>
          </Segment>,
          <Container key={1}>
            <Tab panes={tabs}/>
          </Container>]}
      </div>
    );
  }
}

export default ArchiveContainer;