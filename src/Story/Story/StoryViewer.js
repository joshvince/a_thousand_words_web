import React, { Component } from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

import StoryApi from '../../Api/StoryApi.js';

import PageHeader from '../../App/Header/PageHeader.js';
import StoryStep from './StoryStep.js';

class StoryViewer extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayLoader: true
    }
  }
  componentDidMount = async () => {
    const story = await StoryApi.getOneStory(this.props.storyId)
    this.setState({storyData: story, displayLoader: false})
  }
  render() {
    return (
      <div>
        <Dimmer page active={this.state.displayLoader}>
          <Loader size="huge"/>
        </Dimmer>
        {this.state.displayLoader ? null :
          [
            <PageHeader 
              title={this.state.storyData.title} 
              subtitle={this.state.storyData.subtitle} 
              button={null}
              key={this.props.storyId} 
            />,
            this.state.storyData.steps.map( (step,i) => {
              return <StoryStep step={step} key={i}/>
            })
          ]
        }
      </div>
    );
  }
}

export default StoryViewer;
