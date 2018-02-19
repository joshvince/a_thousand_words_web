import React, { Component } from 'react';
import {Button, Form, Header} from 'semantic-ui-react';
import ImagePreview from '../ImagePreview';

const styles = {
  uploadButton: { marginBottom: '1.2em' }
}

class PictureCreatorForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      showUploadBox: false,
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

  toggleUploadBox = (e) => this.setState({showUploadBox: !this.state.showUploadBox})

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
        <Button 
          basic 
          style={styles.uploadButton}
          content={imageButtonLabel}
          onClick={this.toggleUploadBox} 
        />
        {!this.state.showUploadBox ? null :
          <Form.Field>
            <input 
              type="file" 
              accept="image/*" 
              id="userImg"
              onChange={this.handleImageSelect}
            />
          </Form.Field>}
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