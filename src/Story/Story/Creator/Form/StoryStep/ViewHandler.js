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
        description: ""
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
            submitHandler={this.updateData} 
          /> :
          <StoryStepView 
            headline={this.state.data.headline} 
            year={this.state.data.year}
            description={this.state.data.description}
            submitHandler={this.toggleEdit}
          />}
      </div>
    );
  }
}

export default StoryStepViewHandler;