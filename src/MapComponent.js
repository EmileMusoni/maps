import React, { Component } from 'react';

class MapComponent extends Component {
  componentDidMount() {
    if (!window.google) {
      const script = document.createElement('script');
   
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAT0bfGOwTDLmAeyRO0nVllDpuMpW5x3f0&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = this.initMap;
      document.body.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap = () => {
    const { farmLocations } = this.props;

    // Create a new map centered on a specific location (e.g., first farm location)
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: new window.google.maps.LatLng(
        farmLocations[0].latitude,
        farmLocations[0].longitude
      ),
    });

    // Add markers for each farm location
    farmLocations.forEach((location) => {
      new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        map: map,
        title: 'Farm ID: ' + location.farmID,
      });
    });

    // Add lines between the farm locations
    const lineCoordinates = farmLocations.map((location) => ({
      lat: location.latitude,
      lng: location.longitude,
    }));

    const line = new window.google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    line.setMap(map);
  };

  render() {
    return <div id="map" style={{ height: '400px' }} />;
  }
}

export default MapComponent;
    
    