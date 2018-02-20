import React, { Component } from 'react';
import {  Container, Form, Segment,
          Button, Divider, Header } from 'semantic-ui-react';
import ImagePreview from '../../../../../Picture/ImagePreview';
import DeleteStep from './DeleteStep.js';

const styles = {
  formContainer: { paddingTop: '0.3em' },
  textArea: { minWidth: '100%' },
  divider: { marginBottom: '2em' },
  uploadButton: { marginBottom: '1.2em' },
  explainerText: {
    fontSize: '1.5em',
    marginBottom: '1em'
  }
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

  componentDidMount = () => {
    let key = this.props.stepKey
    /*  Don't scroll to this component when the page first loads, 
        but then scroll for everything else 
        FIXME: a side-effect is that the first step's form is NEVER scrolled to...*/
    if (key !== 0) {
      this[`form${key}`].scrollIntoView(true, {behavior: 'smooth'});
      window.scrollBy(0, -100)
    }    
    this.setState({
      readyToSave: this.isReadyToSave(this.state)
    })
  }

  isReadyToSave = ({headline, imageFile}) => {
    return (headline.length > 3) && (imageFile !== null)
  }

  openModal = (e) => this.setState({showModal: true})

  dismissModal = (e) => this.setState({showModal: false})

  handleDelete = (e) => {
    e.preventDefault();
    this.setState({showModal: false})
    this.props.deleteHandler();
  }

  toggleUploadBox = (e) => this.setState({showUploadBox: !this.state.showUploadBox})

  handleChange = (e, { name, value }) => {
    if (name === "headline") {
      let readyToSavePayload = {headline: value, imageFile: this.state.imageFile}
      this.setState({ 
        [name]: value, 
        readyToSave: this.isReadyToSave(readyToSavePayload) 
      })
    }
    else {
      this.setState({[name]: value})
    }
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    this.props.submitHandler(this.state) 
  }

  handleImageSelect = (e) => {
    e.preventDefault();
    let id = `userImg${this.props.stepKey}`
    let fileInput = document.getElementById(id);
    let file = fileInput.files[0];
    let reader = new FileReader();
    if (file == null) {
      this.setState({
        readyToSave: this.isReadyToSave(this.state)
      })
      alert(`No File Selected`)
    }
    else {
      reader.onloadend = () => {
        let readyToSavePayload = {headline: this.state.headline, imageFile: file }
        this.setState({
          showUploadBox: false,
          imageFile: file,
          imageFileName: file.name,
          imagePreviewUrl: reader.result,
          readyToSave: this.isReadyToSave(readyToSavePayload)
        })
      }
      reader.readAsDataURL(file)
    }
  }

  render(){
    let imageButtonLabel = this.state.imageFileName ? "change image": "upload new image"
    return (
      <div ref={el => { this[`form${this.props.stepKey}`] = el; }}>
      <Container style={styles.formContainer}>
        <Segment clearing>
          <Form size="huge" style={styles.formContainer}>
            <DeleteStep 
              modalShouldDisplay={this.state.showModal}
              openModal={this.openModal}
              dismissModal={this.dismissModal}
              onConfirm={this.props.deleteHandler}
            />
            <Header 
              as='h3' 
              content='1. Upload an image' 
              style={styles.explainerText} 
            />
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
                  id={`userImg${this.props.stepKey}`}
                  onChange={this.handleImageSelect}
                />
              </Form.Field>}
            <Divider  hidden/>
            <Header 
              as='h3' 
              content='2. Write a description' 
              style={styles.explainerText} 
            />
            <Form.Input fluid
              placeholder="Enter a short description"
              name="headline"
              value={this.state.headline}
              onChange={this.handleChange}
            />
            <Form.TextArea 
              style={styles.textArea}
              placeholder="Enter a longer description (optional)" 
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Form.Button
              basic
              color="blue" 
              content="Preview this part"
              size="massive"
              disabled={!this.state.readyToSave}
              onClick={this.handleSubmit} 
            />
          </Form>
        </Segment>
      </Container>
      </div>
    );
  }
}

export default StoryStepForm;