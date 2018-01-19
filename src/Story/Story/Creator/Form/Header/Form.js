import React, { Component } from 'react';
import { Container, Input, Button, Header } from 'semantic-ui-react';

const styles = {
  headerInput: {
    margin: '1em'
  },
  explainerText: {
    margin: '0.7em',
    fontSize: '2em'
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
        <Header 
          as='h3' 
          content='Give your story a title'
          style={styles.explainerText}  
        />
        <Input fluid
          size="huge"  
          placeholder="eg: 'My childhood homes'"
          style={styles.headerInput}
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <Input fluid 
          size="huge" 
          placeholder="Enter a description for your story (optional)" 
          style={styles.headerInput}
          name="subtitle"
          value={this.state.subtitle}
          onChange={this.handleChange}
        />
        <Button 
          basic
          color="blue" 
          content="Preview the title"
          size="huge"
          disabled={!this.state.readyToSave}
          onClick={this.handleSubmit} />
      </Container>
    );
  }
}

export default HeaderForm;
