import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from '../../../Map/Pin.js';
import './LocationSelector.css';
import googleMapStyles from '../../../Map/MapStyles.json';

class MapSelector extends Component {
  constructor(props){
    super(props)
    if (props.withActivePin) {
      this.state = {
        pin: true,
        pinLat: props.withActivePin[0],
        pinLng: props.withActivePin[1],
        defaultZoom: 13
      }
    }
    else {
      this.state = {
        pin: false,
        pinLat: null,
        pinLng: null,
        defaultZoom: 7
      }
    }
    this.movePin = this.movePin.bind(this);
  }
  componentDidMount(){
    this.map.scrollIntoView({behavior: "smooth"})
  }
  movePin({lat, lng}){
    this.setState({
      pin: true,
      pinLat: lat,
      pinLng: lng
    })
    this.props.onLocationChange([lat,lng]);
  }
  render() {
    let defaultCenter, locationPin;
    if (this.state.pin) {
      defaultCenter = {lat: this.state.pinLat, lng: this.state.pinLng}
      locationPin = 
        <Pin 
          lat={this.state.pinLat} 
          lng={this.state.pinLng} 
          clickHandler={e => {return null}}
        />
    }
    else {
      defaultCenter = {lat: 50.82, lng: -0.38}
      locationPin = null
    }
    return (
      <div id="mapContainer" ref={div => this.map = div}>
        <GoogleMapReact 
          id="map"
          bootstrapURLKeys={{
            key: "AIzaSyC7ivn_jzMKgf2_LZhHPHxAknOPx_6F28Y"
          }}          
          defaultZoom={this.state.defaultZoom}
          center={defaultCenter}
          // style={{flex: 1}}
          options={{gestureHandling: 'greedy', styles: googleMapStyles}}
          onClick={e => { this.movePin(e) }} 
        >
          {locationPin}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapSelector;