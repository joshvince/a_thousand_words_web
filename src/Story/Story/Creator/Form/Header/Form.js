import React, { Component } from 'react';
import { Container, Input, Button } from 'semantic-ui-react';

const styles = {
  headerInput: {
    margin: '1em'
  }
}

class HeaderForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title,
      subtitle: this.props.subtitle
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    console.log("fired the submit handler")
    const formData = this.state;
    this.props.submitHandler(formData)
  }

  render() {
    return (
      <Container text>
        <Input inverted fluid
          size="massive"  
          placeholder="Enter a title"
          style={styles.headerInput}
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <Input inverted fluid 
          size="huge" 
          placeholder="Enter a subtitle" 
          style={styles.headerInput}
          name="subtitle"
          value={this.state.subtitle}
          onChange={this.handleChange}
        />
        <Button inverted 
          color="green" 
          content="Save"
          size="huge"
          onClick={this.handleSubmit} />
      </Container>
    );
  }
}

export default HeaderForm;
