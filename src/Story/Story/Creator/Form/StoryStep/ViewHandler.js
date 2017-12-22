import React, { Component } from 'react';
import StoryStepForm from './Form.js';
import StoryStepView from './View.js';

const styles = {
  container: {
    margin: '1em'
  }
}

class StoryStepViewHandler extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: this.props.editing,
      data: this.props.data
    }
    this.updateParentWithData(this.state.data, true)
  }

  // componentDidMount = () => {
  //   let key = this.props.stepKey
  //   if (key !== 0) {
  //     this[`el${key}`].scrollIntoView(true, {behavior: 'smooth'});
  //     window.scrollBy(0, -100)
  //   }    
  // }
  
  // componentDidUpdate = () => {
  //   let key = this.props.stepKey
  //   if (key !== 0) {
  //     this[`el${key}`].scrollIntoView(true, {behavior: 'smooth'});
  //     window.scrollBy(0, -100)
  //   }    
  // }

  updateParentWithData = (data, editValue) => {
    const payload = {
      editing: editValue,
      section: "step",
      data: data, 
      stepKey: this.props.stepKey
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
    let key = this.props.stepKey
    this.props.deleteHandler(key)
  }

  toggleEdit = () => {
    this.setState({editing: true})
    this.updateParentWithData(this.state.data, true)
  }

  render() {
    let key = this.props.stepKey;
    const displayForm = this.state.editing;
    return (
      <div style={styles.container} ref={el => { this[`el${key}`] = el; }}>
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
            stepKey={this.props.stepKey}
          />}
      </div>
    );
  }
}

export default StoryStepViewHandler;