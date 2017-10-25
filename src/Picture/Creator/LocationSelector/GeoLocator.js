import React, { Component } from 'react';
import MapSelector from './MapSelector.js';
import './LocationSelector.css';

class GeoLocator extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayMap: false,
      lat: null,
      lng: null,
      coords: false
    }
    this.onLocationSuccess = this.onLocationSuccess.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }
  componentWillMount(){
    this.getCurrentPosition()
  }
  getCurrentPosition(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(this.onLocationSuccess, error, options);
  }
  onLocationSuccess(pos){
    var coords = pos.coords;
    this.setState({
      displayMap: true,
      lat: coords.latitude,
      lng: coords.longitude,
      coords: [coords.latitude, coords.longitude]
    })
    this.props.onLocationChange([coords.latitude, coords.longitude])
  }
  render() {
    return (
      <div>
        
        {this.state.displayMap ?
            <MapSelector 
              onLocationChange={this.props.onLocationChange}
              withActivePin={this.state.coords}
            /> :
            <div className="loader">Trying to get your location...</div>}
      </div>
    );
  }
}

export default GeoLocator;




