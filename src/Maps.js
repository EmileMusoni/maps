/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FarmMap() {
  const [farmLocations, setFarmLocations] = useState([]);

  useEffect(() => {
    fetchFarmLocations();
  }, []);

  const fetchFarmLocations = async () => {
    try {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_MapView.php');
      setFarmLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch farm locations:', error);
    }
  };

  useEffect(() => {
    if (farmLocations.length > 0) {
      initMap();
    }
  }, [farmLocations]);

  const initMap = () => {
    // Create a new map centered on a specific location (e.g., first farm location)
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: new window.google.maps.LatLng(
        farmLocations[0].latitude,
        farmLocations[0].longitude
      ),
    });

    // Define custom icons for station and car
    const stationIcon = {
      url: 'dist/img/fffficon.png', // Replace with the URL of your station icon image
      scaledSize: new window.google.maps.Size(30, 30), // Adjust the size as needed
    };

    const carIcon = {
      url: 'dist/img/cccincon.png', // Replace with the URL of your car icon image
      scaledSize: new window.google.maps.Size(30, 30), // Adjust the size as needed
    };

    // Add markers for each farm location with the respective icon and title
    farmLocations.forEach((location) => {
      const icon = location.type === 'station' ? stationIcon : carIcon;
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        map: map,
        icon: icon,
      });

      //const title = location.type === 'station' ? 'Station Number: ' + location.id : 'Car Number: ' + location.id;
      const title = location.type === 'station' ? `Station: ${location.stationname}` : `Car: ${location.id}`;
const latLngText = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
const fuelLevelText = location.fuellevel ? `Fuel Level (Litres): ${location.fuellevel}` : '';

const infoWindow = new window.google.maps.InfoWindow({
  content: `
    <div style="color: black;">
      <div>${title}</div>
      <div>${latLngText}</div>
      <div>${fuelLevelText}</div>
    </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
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

  return (
    <div id="map" style={{ height: '400px', width: '105%', margin: '-25px' }}></div>
  );
}

export default FarmMap;
*/

/*
import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

function FarmMap() {
  const [farmLocations, setFarmLocations] = useState([]);

  useEffect(() => {
    fetchFarmLocations();
  }, []);

  const fetchFarmLocations = async () => {
    try {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_MapView.php');
      setFarmLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch farm locations:', error);
    }
  };

  useEffect(() => {
    if (farmLocations.length > 0) {
      initMap();
    }
  }, [farmLocations]);

  const initMap = () => {
    // Load ArcGIS modules
    loadModules(['esri/WebMap', 'esri/views/MapView', 'esri/Graphic'], { css: true })
      .then(([WebMap, MapView, Graphic]) => {
        // Create a WebMap using the web map ID and portal URL
        const webMap = new WebMap({
          portalItem: {
            // Replace with the actual web map ID  : 1b76568e9eac452187e5a4bda3c2efb3

            // https://portal.space.gov.rw/portal/home/webscene/viewer.html?webscene=c895e792b8484b5eb83777e628bd5009 

            id: '1b76568e9eac452187e5a4bda3c2efb3',
             
            portal: {
              url: 'https://portal.space.gov.rw/portal', // Specify the portal URL
            },
          },
        });

        // Create a MapView to display the web map
        const view = new MapView({
          container: 'map',
          map: webMap,
        });

        // Define custom icons for station and car
        const stationIcon = {
          type: 'picture-marker',
          url: 'dist/img/fffficon.png', // Replace with the URL of your station icon image
          width: '24px',
          height: '24px',
        };

        const carIcon = {
          type: 'picture-marker',
          url: 'dist/img/cccincon.png', // Replace with the URL of your car icon image
          width: '24px',
          height: '24px',
        };

        // Add graphics (markers) for each farm location with the respective icon and title
        farmLocations.forEach((location) => {
          const point = {
            type: 'point',
            longitude: location.longitude,
            latitude: location.latitude,
          };

          // Create a graphic with a symbol for the farm location
          const graphic = new Graphic({
            geometry: point,
            symbol: {
              type: location.type === 'station' ? stationIcon.type : carIcon.type,
              url: location.type === 'station' ? stationIcon.url : carIcon.url,
              width: stationIcon.width,
              height: stationIcon.height,
            },
            attributes: {
              title: location.type === 'station' ? `Station: ${location.stationname}` : `Car: ${location.id}`,
              latLngText: `Latitude: ${location.latitude}, Longitude: ${location.longitude}`,
              fuelLevelText: location.fuellevel ? `Fuel Level (Litres): ${location.fuellevel}` : '',
            },
          });

          // Add the graphic to the map
          view.graphics.add(graphic);
        });

        // Add a graphic with a custom icon at the specified coordinates
        const targetPoint = {
          type: 'point',
          longitude: -1.8355300179395466,
          latitude: 30.471381190482234,
        };

        const targetGraphic = new Graphic({
          geometry: targetPoint,
          symbol: {
            type: 'picture-marker',
            url: 'dist/img/custom-icon.png', // Replace with the URL of your custom icon image
            width: '320px',
            height: '32px',
          },
        });

        view.graphics.add(targetGraphic);

        // Zoom to the extent of all farm locations
        const extent = webMap.fullExtent.clone().expand(1.5);
        view.goTo(extent);

        // Center the map on the first farm location
        view.goTo({
          target: [farmLocations[0].longitude, farmLocations[0].latitude],
          zoom: 8, // Adjust the zoom level as needed
        });
      })
      .catch((error) => {
        console.error('Error loading ArcGIS modules:', error);
      });
  };

  return (
    <div id="map" style={{ height: '800px', width: '105%', margin: '-25px' }}></div>
  );
}

export default FarmMap;

*/
import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

const FarmMap = () => {
  const [point, setPoint] = useState(null);
  const mapViewRef = useRef(null);
  const pointGraphicRef = useRef(null);

  useEffect(() => {
    // Fetch initial farm coordinates
    fetchFarmCoordinates();

    // Set up an interval to fetch updated coordinates every 5 seconds
    const intervalId = setInterval(() => {
      fetchFarmCoordinates();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const fetchFarmCoordinates = async () => {
    try {
      const response = await axios.get('http://vicenterc-001-site34.etempurl.com/API_Logistics/GetLocations.php');
      const farmCoordinates = response.data[0]; // Assuming the API response is an array of coordinates
      setPoint(farmCoordinates);
    } catch (error) {
      console.error('Failed to fetch farm coordinates:', error);
    }
  };

  useEffect(() => {
    if (point && mapViewRef.current) {
      // Update the existing graphic's location
      pointGraphicRef.current.geometry = {
        type: 'point',
        longitude: point.longitude,
        latitude: point.latitude,
      };

      // Calculate the new camera position to include the point with some padding
      const padding = 50; // Adjust this value as needed
      const newCameraPosition = {
        position: [point.longitude, point.latitude, 3000],
        tilt: 0,
        heading: 0,
      };
      mapViewRef.current.goTo(newCameraPosition, { padding: { top: padding, bottom: padding, left: padding, right: padding } });

      console.log('Current coordinates:', point);
    }
  }, [point]);

  useEffect(() => {
    if (point && !mapViewRef.current) {
      loadModules(['esri/Graphic', 'esri/WebScene', 'esri/views/SceneView', 'esri/PopupTemplate'], { css: true })
        .then(([Graphic, WebScene, SceneView, PopupTemplate]) => {
          const webScene = new WebScene({
            portalItem: {
              id: 'dbc6a4bc7282403b963480b0d045d51f',
              //id: 'b06fe09db02d43fb9681082769862221 // c895e792b8484b5eb83777e628bd5009',
              portal: {
              url: 'https://carnegiemellon.maps.arcgis.com',
                
              },
            },
          });
          // https://carnegiemellon.maps.arcgis.com/home/webscene/viewer.html?webscene=dbc6a4bc7282403b963480b0d045d51f
        
          const mapView = new SceneView({
            container: 'sceneViewDiv',
            map: webScene,
            camera: {
              position: [point.longitude, point.latitude, 5000],
              tilt: 0,
            },
          });

          const popupTemplate = new PopupTemplate({
            title: 'Delta 1 Location',
            content: `
              <b>Latitude:</b> {latitude}<br>
              <b>Longitude:</b> {longitude}<br>
              <b>Platoon:</b> {pl}<br>
              <b>Company:</b> {coy}<br>
              <b>Battalion:</b> {bn}<br>
            `,
          });
          const pointGraphic = new Graphic({
            geometry: {
              type: 'point',
              longitude: point.longitude,
              latitude: point.latitude,
            },
            symbol: {
              type: 'picture-marker',
              url: 'dist/img/Fplatoon.png',
              width: 20,
              height: 20,
              xoffset: 0,
              yoffset: 0,
              rotation: 0,
            },
            attributes: {
              latitude: point.latitude,
              longitude: point.longitude,
              pl: point.pl,
              coy: point.coy,
              bn: point.bn,
            },
            popupTemplate: popupTemplate,
          });

          /*
          const pointGraphic = new Graphic({
            geometry: {
              type: 'point',
              longitude: point.longitude,
              latitude: point.latitude,
            },
            symbol: {
              type: 'picture-marker',
              url: 'dist/img/Fplatoon.png',
              width: 50,
              height: 50,
              xoffset: 0,
              yoffset: 0,
              rotation: 0,
            },
            //popupTemplate: popupTemplate,
            attributes: point, // Pass the entire point object to the graphic attributes
            popupTemplate: popupTemplate, // Set the popup template for the graphic
          });
          */
          mapView.graphics.add(pointGraphic);
          mapViewRef.current = mapView;
          pointGraphicRef.current = pointGraphic;

          console.log('Layers in webScene:', webScene.layers);
          console.log('Graphics in SceneView:', mapView.graphics);

          mapView.when(() => {
            console.log('Scene fully loaded');
          });
        })
        .catch((error) => {
          console.error('Error loading ArcGIS modules:', error);
        });
    }
  }, [point]);

  return <div id="sceneViewDiv" style={{ height: '800px', width: '100%' }}></div>;
};

export default FarmMap;









