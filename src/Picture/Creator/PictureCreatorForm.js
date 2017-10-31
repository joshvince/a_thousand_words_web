import React, { Component } from 'react';
import LocationSelector from './LocationSelector/LocationSelector.js';
import ParamsEncoder from '../../Encoders/Picture/ParamsEncoder.js';
import ImageUploader from '../../Api/ImageUploader.js';

import './PictureCreator.css';

class PictureCreatorForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      image: {},
      description: "",
      year: "",
      location: "unknown"
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
    this.requiredFieldsPresent = this.requiredFieldsPresent.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }
  handleInputChange(e){
    const target = e.target;
    const name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    //convert the year to an integer
    if (name === "year") {
      value = parseInt(value, 10)
    }
    this.setState({
      [name]: value
    })
  }
  setLocation(locationParams){
    this.setState({
      location: locationParams
    })
  }
  // onFileSelect(){
  //   // grab the file from the form
  //   let fileInput = document.getElementById("userImg");
  //   let file = fileInput.files[0];
  //   // create a new FileReader to handle the binary
  //   let reader = new FileReader();
  //   // on the load event, create a payload featuring the binary and add to the state
  //   reader.addEventListener("load", () => {
  //     let payload = {
  //       binary: reader.result.split(",", 2)[1],
  //       filename: file.name
  //     }
  //     this.setState({
  //       image: payload
  //     })
  //   }, false)
  //   reader.readAsDataURL(file)
  // }
  onFileSelect(){
    // grab the file from the form
    let fileInput = document.getElementById("userImg");
    let file = fileInput.files[0];
    if (file == null) {
      alert(`No File Selected`)
    }
    else {
      ImageUploader(file)
    }
  }
  requiredFieldsPresent(state){
    return state.name.length > 1 && state.image.hasOwnProperty("filename");
  }
  handleFormSubmission(e){
    e.preventDefault()
    var params = ParamsEncoder.encode(this.state)
    this.props.submissionHandler(params)
  }
  render() {
    let ready = !this.requiredFieldsPresent(this.state)
    return (
      <div>
        <h2>Upload a new picture.</h2>
        <form onSubmit={this.handleFormSubmission}>
          <fieldset>
            <div className="section">
              <h3>The Front</h3>
              <label htmlFor="image">Image</label>
              <input  id="userImg" type="file" name="image" 
                      accept="image/*" onChange={this.onFileSelect}/> 
            </div> 
            <div className="section">
              <h3>The Back</h3>
              <label htmlFor="name">Name</label>
              <input  type="text" value={this.state.name} 
                      placeholder="Give this picture a name" name="name" 
                      onChange={this.handleInputChange}/>
              <label htmlFor="description">Description</label>
              <textarea type="text" value={this.state.description}
                        placeholder="Write a description of this picture: who is in it? What does it show?" 
                        name="description" onChange={this.handleInputChange}/>
            </div>
            <div className="section">
              <h3>The Rest</h3>
              <label htmlFor="year">Year</label>
              <input  type="number" value={this.state.year} 
                      placeholder="This picture was taken in"
                      name="year" onChange={this.handleInputChange}/>
              <label htmlFor="location">Location</label>
              <LocationSelector onLocationChange={this.setLocation}/>
            </div>
          <input  id="submit-button" className="button-primary" 
                  type="submit" value="Create" disabled={ready}/>
          </fieldset>
        </form>   
      </div>
    );
  }
}

export default PictureCreatorForm;