import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import data from './data.json';
import { Button } from 'react-bootstrap';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class GoogleMap extends Component {

  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: [],
    paidmarkers: []
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
      <div>
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
        name={marker.name} id={marker.id} position={{lat: marker.latitude, lng: marker.longitude}} 
        icon={{url: 'https://cdn2.iconfinder.com/data/icons/bitsies/128/Lightning-128.png',
        scaledSize: new window.google.maps.Size(40,40)}}
        />)
        }
        {
        data.paidmarkers.map(marker => <Marker onClick={this.onMarkerClick}
        name={marker.name} id={marker.id} position={{lat: marker.latitude, lng: marker.longitude}} 
        icon={{url: 'https://cdn2.iconfinder.com/data/icons/miscellaneous-41/47/Asset_10-128.png',
        scaledSize: new window.google.maps.Size(25,40)}}
        />)
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
            <h4>
            {this.state.selectedPlace.id}
            </h4>
            <Button>asd</Button>
          </div>
        </InfoWindow>

      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'your key'
})(GoogleMap);

