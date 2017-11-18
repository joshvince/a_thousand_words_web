import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

import HeaderViewHandler from './Form/Header/ViewHandler.js';

const styles = {
  header: {
    fontSize: '4em',
    padding: '0.4em'
  },
  headerInput: {
    margin: '1em'
  }
}

class StoryCreator extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  updateFormData = (sectionName, newFormData) => {
    this.setState({
      [sectionName]: newFormData
    })
  }
  render() {
    return (
      <div>
        <Segment vertical inverted>
          <Header as="h1" content="Tell your story..." style={styles.header}/>
          <HeaderViewHandler submitHandler={this.updateFormData}/>
        </Segment>
      </div>
    );
  }
}


export default StoryCreator;