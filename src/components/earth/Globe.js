//globe.js
import React from 'react';
import useTextureLoader from './useTextureLoader.js';
import { MarkerProvider, useMarker } from './MarkerContext.js'; // Assuming Marker is its own component
import colorMap from '../../assets/textures/8k_earth_daymap.png';
import markers from './markers.js'; // Assuming markers is its own component
import { FaLocationDot } from "react-icons/fa6";
import { Html } from '@react-three/drei';

const latLonToSphereCoords = (lat, lon, radius = 2) => {

  let phi = (90 - lat) * (Math.PI / 180);
  let theta = (lon + 180) * (Math.PI / 180);


  let x = -(radius * Math.sin(phi) * Math.cos(theta));
  let y = radius * Math.cos(phi);
  let z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
};



function Globe() {
  // Load the texture using the custom hook
  const earthTexture = useTextureLoader(colorMap);
  const { markers, handleMarkerClick } = useMarker(); // Destructure handleMarkerClick here
  return (
    <mesh receiveShadow>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
      {markers.map((marker) => {
  const position = latLonToSphereCoords(marker.lat, marker.lon);
  return (
    <Html position={position} key={marker.name} center>
      <FaLocationDot style={{ color: '#2ebc15', fontSize: '24px', cursor: 'pointer' }} onClick={() => handleMarkerClick(marker)} />
    </Html>
  );
})}
    </mesh>
  );
}

export default Globe;