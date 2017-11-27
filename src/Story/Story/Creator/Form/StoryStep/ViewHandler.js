import React, { Component } from 'react';
import StoryStepForm from './Form.js';
import StoryStepView from './View.js';

class StoryStepViewHandler extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: true,
      data: {
        headline: "",
        description: "",
        imageFile: null,
        imageFileName: "",
        imagePreviewUrl: ""
      }
    }
  }
  updateData = (newData) => {
    this.setState({
      data: newData,
      editing: false
    })
    const payload = {
      section: "step",
      data: newData, 
      stepKey: this.props.stepKey
    }
    this.props.submitHandler(payload)
  }
  handleDelete = (e) => {
    e.preventDefault();
    let key = this.props.stepKey
    this.props.deleteHandler(key)
  }
  toggleEdit = () => {
    this.setState({editing: true})
  }
  render() {
    const displayForm = this.state.editing;
    return (
      <div>
        {displayForm ? 
          <StoryStepForm 
            stepKey={this.props.stepKey}
            headline={this.state.data.headline} 
            year={this.state.data.year}
            description={this.state.data.description}
            imageFileName={this.state.data.imageFileName}
            imageFile={this.state.data.imageFile}
            imagePreviewUrl={this.state.data.imagePreviewUrl}
            deleteHandler={this.handleDelete}
            submitHandler={this.updateData} 
          /> :
          <StoryStepView 
            headline={this.state.data.headline} 
            year={this.state.data.year}
            description={this.state.data.description}
            imagePreviewUrl={this.state.data.imagePreviewUrl}
            submitHandler={this.toggleEdit}
          />}
      </div>
    );
  }
}

export default StoryStepViewHandler;