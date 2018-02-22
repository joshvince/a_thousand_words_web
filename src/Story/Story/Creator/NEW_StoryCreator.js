import React, { Component } from 'react';
import { Container, Segment, Button, Header } from 'semantic-ui-react';
import TextStepContainer from './Form/TextStep/Container';

const styles = {
  pageContainer: {marginTop: '8em'}
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
    // this.deleteStep = this.deleteStep.bind(this)
  }

  componentDidMount = () => window.scrollTo(0,0);

  initialiseNewStep = (stepType, key) => {
    let newStep;

    if (stepType === 'picture') {
      newStep = {
        editing: true,
        type: stepType,
        data: {
          name: "",
          url: "",
          pictureId: "",
          stepKey: key
        }
      }
    }
    else if (stepType === 'text') {
      newStep = {
        editing: true,
        type: stepType,
        data: {
          headline: "",
          description: "",
          stepKey: key
        }
      }
    }

    return newStep;
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

  render() {
    /*
    TODO:
    - delete steps
    - save story
    - display uploader stuff

    */
    return (
      <Container style={styles.pageContainer}>
        {this.state.steps.map((step, i) => {
          if (step.type === 'text') {
            return (
              <TextStepContainer 
                key={i}
                data={step.data} 
                editing={true}
                deleteHandler={this.deleteStep}
                submitHandler={this.updateStepData}
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
        <Button basic onClick={(e) => this.addNewStep('text')} content="Add new text step"/>
        <Button basic onClick={e => this.addNewStep('picture')} content="Add new picture step" />
      </Container>
      
    );
  }
}

export default StoryCreator;