import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import data from './data.json';
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class GoogleMap extends Component {

  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: []
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount(){
    fetch('/data')
    .then(r => r.json())
    .then(data => {
      this.setState({ markers: data.markers});
    });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
         lat: 65.02,
         lng: 25.41
        }}
      >
        {
        data.markers.map(marker => <Marker onClick={this.onMarkerClick}
        name={marker.name} id={marker.id} position={{lat: marker.latitude, lng: marker.longitude}} />)
        }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>
            {this.state.selectedPlace.name}
            </h4>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'Key Here'
})(GoogleMap);

