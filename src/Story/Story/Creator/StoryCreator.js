import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';

import HeaderViewHandler from './Form/Header/ViewHandler.js';
import StoryStepViewHandler from './Form/StoryStep/ViewHandler.js';

const styles = {
  header: {
    fontSize: '4em',
    padding: '0.4em'
  },
  headerInput: {
    margin: '1em'
  }
}

class StoryCreator extends Component {
  constructor(props){
    super(props);
    this.state = {
      steps: []
    }
  }
  updateFormData = (sectionName, newFormData) => {
    if (sectionName === "step") {
      const newSteps = Array.from(this.state.steps)
      newSteps.push(newFormData)
      
      this.setState({
        steps: newSteps
      })
    }
    else {
      this.setState({
        [sectionName]: newFormData
      })
    }
  }
  render() {
    return (
      <div>
        <Segment vertical inverted>
          <Header as="h1" content="Tell your story..." style={styles.header}/>
          <HeaderViewHandler submitHandler={this.updateFormData}/>
        </Segment>
        <Segment vertical>
          <StoryStepViewHandler submitHandler={this.updateFormData} />
          <Divider section />
          <StoryStepViewHandler submitHandler={this.updateFormData} />
        </Segment>
      </div>
    );
  }
}


export default StoryCreator;