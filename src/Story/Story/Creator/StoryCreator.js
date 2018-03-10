import React, { Component } from 'react';
import { Container, Segment, Button, Header } from 'semantic-ui-react';

import TextStepContainer from './Form/TextStep/Container';
import HeaderViewHandler from './Form/Header/ViewHandler';
import Uploader from '../../../App/Uploader/Uploader';

import StoryApi from '../../../Api/StoryApi';

const styles = {
  pageContainer: {marginTop: '6em'},
  header: {
    header: {
      fontSize: '4em'
    },
    text: {
      fontSize: '1.6em',
      margin: '1.5em 0'
    }
  }
}

class StoryCreator extends Component {
  constructor(props){
    super(props);
    this.state = {
      nextStepKey: 0,
      steps: [],
      editing: true,
      showUploader: false,
      uploadInProgress: false,
      uploadSuccess: null,
      storyId: null
    }
  }
  componentDidMount = () => window.scrollTo(0,0);

  initialiseNewStep = (stepType, key) => {
    const createPictureStep = (key) => {
      return {
        editing: true, 
        data: { type: 'picture', name: "", url: "", pictureId: "", stepKey: key }
      }
    }
    const createTextStep = (key) => {
      return {
        editing: true,
        data: { type: 'text', headline: "", description: "", stepKey: key }
      }
    }
    return (stepType === 'text') ? createTextStep(key) : createPictureStep(key);
  }

  deleteStep = (stepKey) => {
    const stepArray = Array.from(this.state.steps)
    const index = stepArray.findIndex(el => el.data.stepKey === stepKey)
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

  addNewStep = (stepType) => {
    const stepKey = this.state.nextStepKey;
    const newStep = this.initialiseNewStep(stepType, stepKey);

    const nextStepKey = (this.state.nextStepKey + 1);
    let newSteps = Array.from(this.state.steps);
    newSteps.push(newStep)

    this.setState({
      nextStepKey: nextStepKey,
      steps: newSteps
    })
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
    const index = stepArray.findIndex(el => el.data.stepKey === newStepData.data.stepKey)
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
            redirectRoot="/stories"
            objectId={this.state.storyId}
          /> : null}
        <Segment basic inverted vertical>
          <Header as="h1" content="Create a new story" style={styles.header.header}/>
          <Container text>
            <p style={styles.header.text}>
              Use pictures and text to tell your story.
              Create more 'parts' to add more images.
              Hit Save when you're finished.
            </p>
          </Container>
        </Segment>
        <Segment basic vertical>
          <HeaderViewHandler submitHandler={this.updateFormData}/>
        </Segment>
        {this.state.steps.map((step, i) => {
          if (step.data.type === 'text') {
            return (
              <TextStepContainer 
                key={i}
                data={step.data} 
                editing={true}
                deleteHandler={this.deleteStep}
                submitHandler={this.updateFormData}
              />
            )
          }
          else if (step.type === 'picture') {
            return `Picture Step \n`
          }
          else {
            return `Step`
          }
        })}
        <Button basic onClick={e => this.addNewStep('text')} content="Add new text step"/>
        <Button basic onClick={e => this.addNewStep('picture')} content="Add new picture step" />
        <Button basic onClick={e => this.saveStory(e)} content="Save" />
      </div>
      
    );
  }
}

export default StoryCreator;