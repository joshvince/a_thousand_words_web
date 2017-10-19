import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PictureCreatorForm from './PictureCreatorForm.js';
import './PictureCreator.css';

import PictureApi from '../../Api/PictureApi.js';

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      fireRedirect: false,
      addedPicture: {}
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  async handleFormSubmit(formParams){
    let res = await PictureApi.postNewPicture(formParams)
    if (res.status === 200) {
      this.setState({
        fireRedirect: true,
        addedPicture: res.json
      })
    }
    else {
      //TODO: display an error
    }
    console.log(res)
  }
  render() {
    return (
      <div className="column" id="picture-creator">
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