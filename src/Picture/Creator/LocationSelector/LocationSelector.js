import React, { Component } from 'react';
import LocationOption from './LocationOption.js';
import MapSelector from './MapSelector.js';
import GeoLocator from './GeoLocator.js';
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
  render() {
    let unknownClass = this.state.isUnknown ? "active" : "";
    let selectClass = (!this.state.isGeo && !this.state.isUnknown) ? "active" : "";
    let geoClass = this.state.isGeo ? "active" : "";
    let shouldMapDisplay = (!this.state.isGeo && !this.state.isUnknown)
    let shouldGeoDisplay = this.state.isGeo
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
        { shouldMapDisplay ? 
          <MapSelector 
            onLocationChange={this.props.onLocationChange}
            withActivePin={false}
          /> 
            : null} 
        { shouldGeoDisplay ? <GeoLocator onLocationChange={this.props.onLocationChange}/> : null}
      </div>
    );
  }
}

export default LocationSelector;