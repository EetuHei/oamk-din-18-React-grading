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

  // componentDidMount() {
  //   fetch("/data")
  //     .then(r => r.json())
  //     .then(data => {
  //       this.setState({ markers: data.markers });
  //     });
  // }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/api/markers"),
      fetch("http://localhost:4000/api/paidmarkers")
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
    // this.state.items returns all data for markers in array -> accessing one requires this.state.items[x]
    console.log(this.state.paidMarkers);
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
                  url:
                    "https://cdn2.iconfinder.com/data/icons/bitsies/128/Lightning-128.png",
                  scaledSize: new window.google.maps.Size(40, 40)
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
                  url:
                    "https://cdn2.iconfinder.com/data/icons/miscellaneous-41/47/Asset_10-128.png",
                  scaledSize: new window.google.maps.Size(25, 40)
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
