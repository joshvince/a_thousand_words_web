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

  componentDidMount = () => {
    this.setState({
      readyToSave: this.isReadyToSave(this.state.title)
    })
  }

  isReadyToSave = (title) => {
    return title.length > 3
  }

  handleChange = (e, { name, value }) => {
    let titleVal = this.state.title;
    if (name === 'title') {
      titleVal = value
    }
    this.setState({ 
      [name]: value,
      readyToSave: this.isReadyToSave(titleVal) 
    })
  }

  handleSubmit = (e) => {
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
          placeholder="Enter a description (optional)" 
          style={styles.headerInput}
          name="subtitle"
          value={this.state.subtitle}
          onChange={this.handleChange}
        />
        <Button inverted 
          color="green" 
          content="Confirm the title"
          size="huge"
          disabled={!this.state.readyToSave}
          onClick={this.handleSubmit} />
      </Container>
    );
  }
}

export default HeaderForm;
