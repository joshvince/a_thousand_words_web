import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PictureCreatorForm from './PictureCreatorForm.js';
import ErrorMessage from '../../App/Error/ErrorMessage.js';
import './PictureCreator.css';

import PictureApi from '../../Api/PictureApi.js';

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayError: false,
      fireRedirect: false,
      addedPicture: {}
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  async handleFormSubmit(formParams){
    let res = await PictureApi.postNewPicture(formParams)
    if (res.status === 201) {
      this.setState({
        fireRedirect: true,
        addedPicture: res.json
      })
    }
    else {
      this.setState({displayError: true})
    }
  }
  render() {
    return (
      <div className="column" id="picture-creator">
        {this.state.displayError && (
          <ErrorMessage 
            message="There was a problem with saving your picture. Refresh and try again"
          />
        )}
        <PictureCreatorForm submissionHandler={this.handleFormSubmit} /> 
        {this.state.fireRedirect && (
          <Redirect to={{
            pathname: '/pictures', 
            state: {activePic: this.state.addedPicture}
          }} />
        )}
      </div>
    );
  }
}

export default PictureCreator;