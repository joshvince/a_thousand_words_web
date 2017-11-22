import React, { Component } from 'react';
import { Segment, Header, Divider, Button } from 'semantic-ui-react';

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
      nextStepKey: 1,
      activeSteps: [this.initialiseStep()]
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
    let stepArray = Array.from(this.state.activeSteps);
    const index = stepArray.findIndex(el => el.stepKey == newStepData.stepKey)
    if (index !== -1) {
      // you found a dupe, replace it
      stepArray.splice(index, 1, newStepData);
      this.setState({ activeSteps: stepArray })
    }
    else {
      // add it to the end of the array
      stepArray.push(newStepData)
      this.setState({ activeSteps: stepArray })
    }
  }
  
  addNewStep = () => {
    const newStep = this.initialiseStep(this.state.nextStepKey)
    const newSteps = Array.from(this.state.activeSteps)
    newSteps.push(newStep)
    const nextStepKey = (this.state.nextStepKey + 1)
    this.setState({
      nextStepKey: nextStepKey,
      activeSteps: newSteps
    })
  }

  deleteStep = (stepKey) => {
    const stepArray = Array.from(this.state.activeSteps)
    const index = stepArray.findIndex(el => el.stepKey == stepKey)
    if (index !== -1) {
      // delete it
      stepArray.splice(index, 1);
      this.setState({ activeSteps: stepArray })
    }
    else {
      return null
    }
  }

  //TODO: DELETE A STEP USING THE BUTTON! FIND IT IN THE ARRAY SOMEHOW AND KILL IT.

  render() {
    return (
      <div>
        <Segment vertical inverted>
          <Header as="h1" content="Tell your story..." style={styles.header}/>
          <HeaderViewHandler submitHandler={this.updateFormData}/>
        </Segment>
        <Segment vertical>
          {this.state.activeSteps.map((step, i) => {
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
            />
        </Segment>
      </div>
    );
  }
}


export default StoryCreator;