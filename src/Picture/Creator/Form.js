import React, { Component } from 'react';
import {Button, Form, Header} from 'semantic-ui-react';
import ImagePreview from '../ImagePreview';

const styles = {
  uploadButton: { 
    wrapper: {
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-block'
    },
    button: {
      marginBottom: '1.2em' 
    },
    input: {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0
    }
  }
}

class PictureCreatorForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      imageFile: null,
      imageFileName: null,
      imagePreviewUrl: null,
      pictureName: ""
    }
  }

  componentDidMount = () => {
    this.setState({ readyToSave: this.isReadyToSave(this.state) })
  }

  isReadyToSave = ({pictureName, imageFile}) => {
    return (pictureName.length > 1) && (imageFile !== null)
  }

  handleChange = (e, { name, value }) => {
    let readyToSavePayload = {pictureName: value, imageFile: this.state.imageFile}
    this.setState({ 
      [name]: value, 
      readyToSave: this.isReadyToSave(readyToSavePayload) 
    })
  }

  handleImageSelect = (e) => {
    e.preventDefault();
    let fileInput = document.getElementById("userImg");
    let file = fileInput.files[0];
    let reader = new FileReader();

    if (file == null) { alert(`No File Selected`) }
    else {
      reader.onloadend = () => {
        this.setState({
          showUploadBox: false,
          imageFile: file,
          imageFileName: file.name,
          imagePreviewUrl: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name: this.state.pictureName,
      file: this.state.imageFile
    }
    this.props.submitHandler(payload)
  }

  render() {
    let imageButtonLabel = this.state.imageFileName ? "change image": "upload new image"
    return (
      <Form size="huge">
        <ImagePreview imagePreviewUrl={this.state.imagePreviewUrl} />     
        <div style={styles.uploadButton.wrapper}> 
          <Button 
            basic 
            size="huge"
            style={styles.uploadButton.button}
            content={imageButtonLabel}
            onClick={this.toggleUploadBox} 
          />
            <input 
              style={styles.uploadButton.input}
              type="file" 
              accept="image/*" 
              id="userImg"
              onChange={this.handleImageSelect}
            />
          </div>
        <Header 
          as='h2' 
          content='Give it a name'  
        />
        <Form.Input
          placeholder="Enter a name for your picture"
          name="pictureName"
          value={this.state.pictureName}
          onChange={this.handleChange}
        />
        <Form.Button
            color="green" 
            content="Save"
            size="massive"
            disabled={!this.state.readyToSave}
            onClick={this.handleSubmit} 
          />
      </Form>
    );
  }
}

export default PictureCreatorForm;