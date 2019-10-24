import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import data from "./data.json";
import { Button } from "react-bootstrap";
import api from "./api.json";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class GoogleMap extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: [],
    paidMarkers: [],
    isLoaded: false
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

  componentDidMount() {
    Promise.all([
      fetch(data.url1),
      fetch(data.url2)
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        this.setState({
          isLoaded: true,
          markers: res1,
          paidMarkers: res2
        });
      });
  }

  render() {
    // console.log(this.state.paidMarkers);
    const { isLoaded, markers, paidmarkers } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
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
            {this.state.markers.map(marker => (
              <Marker
                onClick={this.onMarkerClick}
                name={marker.name}
                id={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={{
                  url: marker.icon,
                  scaledSize: new window.google.maps.Size(25, 40)
                }}
              />
            ))}
            {this.state.paidMarkers.map(marker => (
              <Marker
                onClick={this.onMarkerClick}
                name={marker.name}
                id={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={{
                  url: marker.icon,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              />
            ))}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>City: {this.state.selectedPlace.name}</h4>
                <h4>ID: {this.state.selectedPlace.id}</h4>
                <h4>Price: {this.state.selectedPlace.price}</h4>
                <Button>asd</Button>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: api.key
})(GoogleMap);
