import React, { Component } from 'react';
import {  Container, Form, TextArea, 
          Input, Button, Icon, Header } from 'semantic-ui-react';

const styles = {
  formContainer: {
    marginTop: '2em'
  },
  textArea: {
    minWidth: '100%'
  },
  imageButton: {
    marginBottom: '2em'
  }
}
class StoryStepForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      headline: this.props.headline,
      year: this.props.year,
      description: this.props.description
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    const formData = this.state;
    this.props.submitHandler(formData)
  }

  render(){
    return (
      <Container text>
        <Form size="huge" style={styles.formContainer}>
        <Button 
          basic
          size="massive"
          icon="image"
          content="Upload an image"
          style={styles.imageButton}
        />         


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