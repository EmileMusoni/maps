import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

const PlansMap = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    loadModules(['esri/Graphic', 'esri/WebScene', 'esri/views/SceneView'], { css: true })
      .then(([Graphic, WebScene, SceneView]) => {
        const webScene = new WebScene({
          portalItem: {
            id: 'c895e792b8484b5eb83777e628bd5009',
            portal: {
              url: 'https://portal.space.gov.rw/portal',
            },
          },
        });

        const view = new SceneView({
          container: 'sceneViewDiv',
          map: webScene,
          camera: {
            position: [30.478505141389807, -1.8331708637944961, 2000],
            tilt: 0,
          },
        });

        const endCoords = {
          longitude: 30.482819315819476,
          latitude: -1.8415566482311345,
        };

        const point = {
          type: 'point',
          longitude: 30.478505141389807,
          latitude: -1.8331708637944961,
        };

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: {
            type: 'picture-marker',
            url: 'dist/img/F_Aircraft.png',
            width: 50,
            height: 50,
            xoffset: 0,
            yoffset: 0,
            rotation: 0,
          },
        });

        view.graphics.add(pointGraphic);

        console.log('Current coordinates:', point);
        console.log('Layers in webScene:', webScene.layers);
        console.log('Graphics in SceneView:', view.graphics);

        const stepSize = {
          longitude: (endCoords.longitude - point.longitude) / 300,
          latitude: (endCoords.latitude - point.latitude) / 300,
        };

        let stepCount = 0;
        let intervalId;

        const animatePoint = () => {
          intervalId = setInterval(() => {
            point.longitude += stepSize.longitude;
            point.latitude += stepSize.latitude;
            pointGraphic.geometry = point;

            if (++stepCount === 300) {
              clearInterval(intervalId);
              console.log('Animation complete');
              setIsAnimating(false);
            }
          }, 100);
        };

        const startAnimation = () => {
          setIsAnimating(true);
          animatePoint();
        };

        const stopAnimation = () => {
          clearInterval(intervalId);
          setIsAnimating(false);
        };

        document.getElementById('startButton').addEventListener('click', startAnimation);
        document.getElementById('stopButton').addEventListener('click', stopAnimation);

      })
      .catch((error) => {
        console.error('Error loading ArcGIS modules:', error);
      });
  }, []);

  return (
    <div>
      <div id="sceneViewDiv" style={{ height: '800px', width: '100%' }}></div>
      <button id="startButton" disabled={isAnimating}>Start Animation</button>
      <button id="stopButton" disabled={!isAnimating}>Stop Animation</button>
    </div>
  );
};

export default PlansMap;
