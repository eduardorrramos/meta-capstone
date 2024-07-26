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
  apiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
