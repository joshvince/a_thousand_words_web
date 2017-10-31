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
    let fileInput = document.getElementById("userImg");
    let file = fileInput.files[0];
    if (file == null) {
      alert(`No File Selected`)
    }
    else {
      let uploadedImg = await PictureApi.uploadImage(file);
      let fullParams = {
        ...formParams,
        image: uploadedImg.url,
        uuid: uploadedImg.uuid
      };
      let res = await PictureApi.postNewPicture(fullParams)
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