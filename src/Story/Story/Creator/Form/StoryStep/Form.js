import React, { Component } from 'react';
import {  Container, Form, TextArea, 
          Input, Button, Icon, Header, Image, Divider } from 'semantic-ui-react';
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
      showUpload: !this.props.imageFile
    }
  }

  toggleUpload = () => this.setState({showUpload: !this.state.showUpload})

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    const formData = this.state;
    this.props.submitHandler(formData)
  }

  handleImageSelect = (e) => {
    e.preventDefault();
    let fileInput = document.getElementById("userImg");
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
            onClick={this.toggleUpload} 
          />
        
          {!this.state.showUpload ? null :
            <Form.Field>
              <input 
                type="file" 
                accept="image/*" 
                id="userImg"
                onChange={this.handleImageSelect}
              />
            </Form.Field>}
          <Divider style={styles.divider}/>
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
            color="green" 
            content="Save"
            size="huge"
            onClick={this.handleSubmit} />
        </Form>
      </Container>
    );
  }
}

export default StoryStepForm;