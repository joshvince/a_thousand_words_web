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
        year: "",
        description: "",
        imageFile: null,
        imageFileName: null,
        imagePreviewUrl: null
      }
    }
  }
  updateData = (newData) => {
    this.setState({
      data: newData,
      editing: false
    })
    this.props.submitHandler("step", newData)
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
            headline={this.state.data.headline} 
            year={this.state.data.year}
            description={this.state.data.description}
            imageFileName={this.state.data.imageFileName}
            imageFile={this.state.data.imageFile}
            imagePreviewUrl={this.state.data.imagePreviewUrl}
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