import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PictureCreatorForm from './PictureCreatorForm.js';
import Picture from '../Picture.js';
import PictureApi from '../../Api/PictureApi.js';
import './PictureCreator.css';

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayForm: true,
      isModalVisible: false,
      activePicture: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.resetView = this.resetView.bind(this);
  }
  async handleFormSubmit(formParams){
    let res = await PictureApi.postNewPicture(formParams)
    this.setState({
      displayForm: false,
      isModalVisible: true,
      activePicture: res
    })
    console.log(res)
  }
  dismissModal(){
    this.setState({
      isModalVisible: false
    })
  }
  resetView(){
    this.setState({
      displayForm: true,
      activePicture: null      
    })
  }
  render() {
    let modal = this.state.isModalVisible ? <Picture dismissAction={this.dismissModal} picture={this.state.activePicture} /> : null
    let view = this.state.displayForm ? 
      <PictureCreatorForm submissionHandler={this.handleFormSubmit} /> :
      <div>
        {modal}
        <Link to="/pictures"><h3>View the map</h3></Link>
        <h3 onClick={this.resetView}>Create another picture</h3>
      </div>
    return (
      <div className="column" id="picture-creator">
        {view}
      </div>
    );
  }
}

export default PictureCreator;