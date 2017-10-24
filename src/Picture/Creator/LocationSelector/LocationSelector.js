import React, { Component } from 'react';
import Modal from '../../../App/Modal/Modal.js';
import LocationOption from './LocationOption.js';
import MapSelector from './MapSelector.js';
import './LocationSelector.css';

class LocationSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
      isUnknown: true,
      isGeo: false
    }
    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  onOptionSelect(opt){
    if (opt === "unknown") {
      this.setState({
        isUnknown: true,
        isGeo: false
      })
    }
    else if (opt === "select") {
      this.setState({
        modalOpen: true,
        isUnknown: false,
        isGeo: false
      })
    }
    else if (opt === "geolocation") {
      this.setState({
        isUnknown: false,
        isGeo: true
      })
    }
  }
  toggleModal(){
    let newVal = !this.state.modalOpen
    this.setState({
      modalOpen: newVal
    })
  }
  render() {
    let unknownClass = this.state.isUnknown ? "active" : "";
    let selectClass = (!this.state.isGeo && !this.state.isUnknown) ? "active" : "";
    let geoClass = this.state.isGeo ? "active" : "";
    return (
      <div>
        <div className="row">
          <LocationOption 
            clickHandler={this.onOptionSelect} 
            activeClass={unknownClass} 
            optionName={"unknown"}
            text="I don't know the location"
          />
          <LocationOption 
            clickHandler={this.onOptionSelect} 
            activeClass={selectClass} 
            optionName={"select"}
            text="I know where this picture was taken"
          />  
          <LocationOption 
            clickHandler={this.onOptionSelect} 
            activeClass={geoClass} 
            optionName={"geolocation"}
            text="This picture was taken where I am right now"
          />  
        </div>
        {
          !this.state.modalOpen ? null :
            <Modal 
              dismissAction={e => this.toggleModal()} 
              children={
                <MapSelector />
              } 
            />
         }
      </div>
    );
  }
}

export default LocationSelector;