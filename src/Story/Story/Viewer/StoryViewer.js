import React, { Component } from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

import StoryApi from '../../../Api/StoryApi.js';

import StoryHeader from './Header.js';
import StoryFooter from './Footer.js';
import PictureView from '../../../Picture/Viewer/View';
import StoryTextView from './StoryTextView';

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
      <div>
        <Dimmer page active={this.state.displayLoader}>
          <Loader size="huge"/>
        </Dimmer>
        {this.state.displayLoader ?
          null
          :
          [
            <StoryHeader
              title={this.state.storyData.title}
              subtitle={this.state.storyData.subtitle}
              button={null}
              key={this.props.storyId}
            />,
            this.state.storyData.steps.map((step,i) => {
              return (step.type === 'picture') ?
                <PictureView picture={step} key={i}/>
                :
                <StoryTextView storyText={step} key={i} />
            }),
            <StoryFooter key={999}/>
          ]
        }
      </div>
    );
  }
}

export default StoryViewer;
