// earthindex.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MarkerProvider } from './MarkerContext';
import Globe from './Globe';
import { OrbitControls } from '@react-three/drei';
import markers from './markers';
const handleMarkerClick = (marker) => {
  console.log("Marker clicked:", marker);
  // Add additional logic here as needed
};
export function Earth() {
  // Marker data including image URLs
 

  return (
    
    <>
        <ambientLight intensity={1} />
        <directionalLight color="#ffffff" intensity={3} position={[1, -5, 5]} castShadow />
        <Globe markers={markers} onMarkerClick={(marker) => handleMarkerClick(marker)}/>
        <OrbitControls 
        enableZoom={false} 
        enablePan={true} 
        enableRotate={true} 
        maxAzimuthAngle={50 * (Math.PI / 180)} // 30 degrees in radians
        minAzimuthAngle={-10 * (Math.PI / 180)} // -30 degrees in radians
        maxPolarAngle={180 * (Math.PI / 180)}
        minPolarAngle={50 * (Math.PI / 180)}
      />
      
      </>
  );
}