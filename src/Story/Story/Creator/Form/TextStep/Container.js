import React, { Component } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import StoryTextView from '../../../Viewer/StoryTextView';
import StoryTextForm from './Form';

const styles = {
  container: {
    margin: '1em'
  }
}

class TextStepContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: this.props.editing,
      data: this.props.data
    }
    this.updateParentWithData(this.state.data, true)
  }

  updateParentWithData = (data, editValue) => {
    const payload = {
      editing: editValue,
      section: "step",
      type: "text",
      data: data, 
    }
    this.props.submitHandler(payload)
  }

  updateData = (newData) => {
    this.setState({
      data: newData,
      editing: false
    })
    this.updateParentWithData(newData, false)
  }

  handleDelete = () => {
    let key = this.props.data.stepKey
    this.props.deleteHandler(key)
  }

  toggleEdit = () => {
    this.setState({editing: !this.state.editing})
    this.updateParentWithData(this.state.data, true)
  }

  render() {
    let key = this.props.data.stepKey;
    return (
      <div style={styles.container} ref={el => { this[`el${key}`] = el; }}>
        <Segment>
        {this.state.editing ? 
          <StoryTextForm 
            submitHandler={this.updateData} 
            deleteHandler={this.handleDelete}
            data={this.state.data} 
          /> :
          [
            <StoryTextView storyText={this.state.data} key={0}/>,
            <Button content="Edit" onClick={this.toggleEdit} key={1}/>
          ]
        }
        </Segment>
      </div>
    );
  }
}

export default TextStepContainer;