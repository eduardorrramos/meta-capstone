import { Map, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
class MapContainer extends Component {
  render() {
    return (
      <Map>
        google = {this.props.google}
        style = {{ width: "100%", height: "100%" }}
        zoom = {10}
        initialCenter = {{ lat: 29.2, lng: 95.2 }}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE",
})(MapContainer);
