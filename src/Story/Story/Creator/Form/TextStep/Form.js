import React, { Component } from 'react';
import {Container, Header, Form, Button} from 'semantic-ui-react';

const styles = {
  buttons: {
    margin: '0.5em'
  }
}

class TextStepForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      headline: this.props.data.headline,
      description: this.props.data.description,
      stepKey: this.props.data.stepKey
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({[name]: value})
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    this.props.submitHandler(this.state) 
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteHandler();
  }

  render() {
    return (
      <Container>
        <Form size="huge">
          <Header as="h3" content="Edit this part of the story" />
          <Form.Input fluid
            placeholder="Enter a headline"
            name="headline"
            value={this.state.headline}
            onChange={this.handleChange}
          />
          <Form.TextArea 
            placeholder="Enter some longer text" 
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button.Group>
            <Form.Button
              basic
              color="red"
              content="Delete this part"
              size="massive"
              onClick={this.handleDelete}
              style={styles.buttons}
            />
            <Form.Button
              basic
              color="blue" 
              content="Preview this part"
              size="massive"
              onClick={this.handleSubmit} 
              style={styles.buttons}
            />
          </Button.Group>
          
        </Form>
      </Container>
    );
  }
}

export default TextStepForm;