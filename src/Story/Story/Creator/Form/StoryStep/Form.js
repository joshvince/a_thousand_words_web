import React, { Component } from 'react';
import {  Container, Form, Segment, Confirm,
          Button, Divider } from 'semantic-ui-react';
import ImagePreview from './ImagePreview.js';

const styles = {
  formContainer: {
    paddingTop: '0.3em'
  },
  textArea: { minWidth: '100%' },
  divider: {marginBottom: '2em'},
  uploadButton: { marginBottom: '1.2em'}
}

class StoryStepForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      headline: this.props.headline,
      year: this.props.year,
      description: this.props.description,
      imageFile: this.props.imageFile,
      imageFileName: this.props.imageFileName,
      imagePreviewUrl: this.props.imagePreviewUrl,
      showUploadBox: false,
      showModal: false
    }
  }
  showModal = (e) => this.setState({showModal: true})

  dismissModal = (e) => this.setState({showModal: false})

  toggleUploadBox = (e) => this.setState({showUploadBox: !this.state.showUploadBox})

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => { this.props.submitHandler(this.state) }

  handleImageSelect = (e) => {
    e.preventDefault();
    let id = `userImg${this.props.stepKey}`
    let fileInput = document.getElementById(id);
    let file = fileInput.files[0];
    let reader = new FileReader();
    if (file == null) {
      alert(`No File Selected`)
    }
    else {
      reader.onloadend = () => {
        console.log(file.name)
        this.setState({
          showUpload: false,
          imageFile: file,
          imageFileName: file.name,
          imagePreviewUrl: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  presentFileSize = (bytes) => {
    return `${(bytes / 1000000).toFixed(2)}mb`
  }

  render(){
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let imageFileName = this.state.imageFileName;
    let fileSize = this.state.imageFile ? this.state.imageFile.size : null
    return (
      <Container style={styles.formContainer}>
        <Segment clearing>
        <Segment basic>
          <Button 
            basic 
            negative 
            content="Delete" 
            floated="right" 
            onClick={this.showModal}
          />
          <Confirm
            content="This action cannot be undone. Are you sure you want to delete this step?"
            open={this.state.showModal}
            onCancel={this.dismissModal}
            onConfirm={this.props.deleteHandler}
          />
        </Segment>
          <Form size="huge" style={styles.formContainer}>
            <ImagePreview 
              imageFileName={imageFileName}
              imagePreviewUrl={imagePreviewUrl}
              imageFileSize={fileSize}
            />        
            <Button 
              basic 
              style={styles.uploadButton}
              content="upload new image" 
              onClick={this.toggleUploadBox} 
            />
          
            {!this.state.showUploadBox ? null :
              <Form.Field>
                <input 
                  type="file" 
                  accept="image/*" 
                  id={`userImg${this.props.stepKey}`}
                  onChange={this.handleImageSelect}
                />
              </Form.Field>}
            <Divider  hidden/>
            <Form.Input fluid
              placeholder="Enter a headline"
              name="headline"
              value={this.state.headline}
              onChange={this.handleChange}
            />
            <Form.TextArea 
              style={styles.textArea}
              placeholder="Enter a description" 
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Form.Button
              basic
              color="green" 
              content="Save this step"
              size="huge"
              onClick={this.handleSubmit} 
            />
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default StoryStepForm;