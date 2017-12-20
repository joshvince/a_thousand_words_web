import React, { Component } from 'react';
import { Segment, Header, Divider, Button} from 'semantic-ui-react';

import EmptySteps from './Empty/EmptySteps.js';
import HeaderViewHandler from './Form/Header/ViewHandler.js';
import StoryStepViewHandler from './Form/StoryStep/ViewHandler.js';
import AddNewStep from './Form/StoryStep/AddNewStep.js';
import Uploader from './Uploader/Uploader.js';

import StoryApi from '../../../Api/StoryApi.js';

const styles = {
  pageContainer: {marginTop: '5em'},
  header: {
    fontSize: '3em',
    padding: '0.4em',
    margin: 0
  },
  headerInput: {
    margin: '1em'
  },
  actionButtons: {
    marginBottom: '1em'
  }
}

class StoryCreator extends Component {
  constructor(props){
    super(props);
    this.state = {
      nextStepKey: 1,
      steps: [this.initialiseStep()],
      editing: true,
      showUploader: false,
      uploadInProgress: false,
      uploadSuccess: null,
      storyId: null
    }
    this.deleteStep = this.deleteStep.bind(this)
  }

  componentDidMount = () => window.scrollTo(0,0);

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
    }
    else {
      // add it to the end of the array
      stepArray.push(newStepData)
    }
    let editing = stepArray.some( step => step.editing )
    this.setState({ steps: stepArray, editing: editing })
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
      let editing = stepArray.some( step => step.editing )
      this.setState({ steps: stepArray, editing: editing })
    }
    else {
      return null
    }
  }

  saveStory = (e) => {
    e.preventDefault();
    this.setState({showUploader: true, uploadInProgress: true})

    StoryApi.create(this.state, this.props.currentUser.id).then(resp => {
      if (resp.success) {
        this.setState({
          uploadInProgress: false,
          uploadSuccess: true, 
          storyId: resp.object.uuid
        })
      }
      else {
        this.setState({
          uploadInProgress: false,
          uploadSuccess: false
        })
      }
    })
    .catch(error => {
      this.setState({
        uploadInProgress: false,
        uploadSuccess: false
      })
      console.log(`Error creating the story: ${error}`)
    })
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        {this.state.showUploader ? 
        <Uploader 
          isInProgress={this.state.uploadInProgress} 
          result={this.state.uploadSuccess}
          storyId={this.state.storyId}
        /> : null}
        <Segment vertical inverted>
          <Header as="h2" content="Give your story a title" style={styles.header}/>
          <HeaderViewHandler submitHandler={this.updateFormData}/>
        </Segment>
        <Segment vertical>
          <Header as="h2" content="Add some images and text" style={styles.header}/>
          {this.state.steps.length ? 
            this.state.steps.map((step, i) => {
              return(
                <StoryStepViewHandler 
                  stepKey={step.stepKey} 
                  submitHandler={this.updateFormData} 
                  deleteHandler={this.deleteStep}
                  key={step.stepKey}
                />
              )
            }) : <EmptySteps />
          }
            <AddNewStep 
              clickHandler={this.addNewStep} 
              disabled={this.state.editing}
            />
          </Segment>
          <Header as="h2" content="Save and share" style={styles.header}/>
          <Button
            size="massive"
            positive
            content="I'm finished"
            width={12}
            onClick={this.saveStory}
            style={styles.actionButtons}
            disabled={this.state.editing}
          />
      </div>
    );
  }
}

export default StoryCreator;