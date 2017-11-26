import React, { Component } from 'react';
import { Segment, Header, Divider, Button, Loader, Dimmer } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import HeaderViewHandler from './Form/Header/ViewHandler.js';
import StoryStepViewHandler from './Form/StoryStep/ViewHandler.js';

import StoryApi from '../../../Api/StoryApi.js';

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
      nextStepKey: 1,
      steps: [this.initialiseStep()],
      displayLoader: false,
      fireRedirect: false,
      storyId: null
    }
  }

  initialiseStep = (key = 0) => {
    return {
      stepKey: key,
      data: {
        headline: "",
        year: "",
        description: "",
        imageFile: null,
        imageFileName: null,
        imagePreviewUrl: null
      }
    }
  }
  updateFormData = (payload) => {
    if (payload.section === "step") {
      this.updateStepData(payload)
    }
    else {
      this.setState({ [payload.section]: payload.data })
    }
  }

  updateStepData = (newStepData) => {
    let stepArray = Array.from(this.state.steps);
    const index = stepArray.findIndex(el => el.stepKey === newStepData.stepKey)
    if (index !== -1) {
      // you found a dupe, replace it
      stepArray.splice(index, 1, newStepData);
      this.setState({ steps: stepArray })
    }
    else {
      // add it to the end of the array
      stepArray.push(newStepData)
      this.setState({ steps: stepArray })
    }
  }
  
  addNewStep = () => {
    const newStep = this.initialiseStep(this.state.nextStepKey)
    const newSteps = Array.from(this.state.steps)
    newSteps.push(newStep)
    const nextStepKey = (this.state.nextStepKey + 1)
    this.setState({
      nextStepKey: nextStepKey,
      steps: newSteps
    })
  }

  deleteStep = (stepKey) => {
    const stepArray = Array.from(this.state.steps)
    const index = stepArray.findIndex(el => el.stepKey === stepKey)
    if (index !== -1) {
      // delete it
      stepArray.splice(index, 1);
      this.setState({ steps: stepArray })
    }
    else {
      return null
    }
  }

  displayLoader = (e) => {
    this.setState({displayLoader: true})
    this.saveStory()
  }

  saveStory = async () => {
    try {
      const resp = await StoryApi.create(this.state, this.props.currentUser.id)
      this.redirectToStory(resp.uuid)
      console.log(`Created a story in the DB: ${JSON.stringify(resp)}`)
    } catch (error) {
      this.setState({displayLoader: false})
      console.log(`Error creating the story: ${error}`)
    }
  }

  redirectToStory = (storyId) => {
    this.setState({
      fireRedirect: true,
      storyId: storyId
    })
  }

  render() {
    return (
      <div>
        <Dimmer page active={this.state.displayLoader}>
          <Loader size="huge" content="Uploading your story" indeterminate/>
        </Dimmer>
        <Segment vertical inverted>
          <Header as="h1" content="Tell your story..." style={styles.header}/>
          <HeaderViewHandler submitHandler={this.updateFormData}/>
        </Segment>
        <Segment vertical>
          {this.state.steps.map((step, i) => {
            return(
              <div key={i}>
                <StoryStepViewHandler 
                  stepKey={step.stepKey} 
                  submitHandler={this.updateFormData} 
                  deleteHandler={this.deleteStep}
                />
                <Divider section />
              </div>
            )
          })}
            <Button 
              secondary 
              size="massive" 
              content="Add new step" 
              onClick={this.addNewStep}
            /> 
            <Button
              size="massive"
              positive
              content="Save this story"
              width={12}
              onClick={this.saveStory}
            />
        </Segment>
        {this.state.fireRedirect && (
          <Redirect to={{pathname: `/stories/${this.state.storyId}`}} />
        )}
      </div>
    );
  }
}


export default StoryCreator;