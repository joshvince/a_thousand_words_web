import React, { Component } from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

import StoryApi from '../../../Api/StoryApi.js';

import StoryHeader from './Header.js';
import StoryStep from './StoryStep.js';
import StoryFooter from './Footer.js';
import PictureView from '../../../Picture/Viewer/View';
import StoryTextView from './StoryTextView';

const styles = {
  pageContainer: {marginTop: '5em'}
}

class StoryViewer extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayLoader: true
    }
  }
  componentDidMount = async () => {
    window.scrollTo(0,0);
    const story = await StoryApi.getOneStory(this.props.storyId)
    this.setState({storyData: story, displayLoader: false})
  }
  render() {
    return (
      <div style={styles.pageContainer}>
        <Dimmer page active={this.state.displayLoader}>
          <Loader size="huge"/>
        </Dimmer>
        {this.state.displayLoader ? null :
          [
            <StoryHeader 
              title={this.state.storyData.title} 
              subtitle={this.state.storyData.subtitle} 
              button={null}
              key={this.props.storyId} 
            />,
            this.state.storyData.steps.map((step,i) => {
              switch (step.type) {
                case 'picture':
                  return <PictureView picture={step} key={i}/>
                  break;
                case 'text':
                  break;
                  return <StoryTextView storyText={step} key={i} />
                default:
                  return <StoryStep step={step} key={i}/>
                  break;
              }             
            }),
            <StoryFooter key={999}/>
          ]
        }
      </div>
    );
  }
}

export default StoryViewer;
