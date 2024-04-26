import React from 'react';
import { MarkerProvider, useMarker } from './earth/MarkerContext';

import { Html } from '@react-three/drei';

function Overlay({ marker, onClose, markers }) {

    if (!marker) {
        // You can return null, a loading indicator, or any placeholder content
        return <div> Loading... </div>; // Or, for example, <div>Loading...</div>
      }
    return (
        <Html>
      <div style={{ width: '20vw', borderRadius: '12px' , height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'white', position: 'relative', zIndex: '9999' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}>Close</button>
        <h2>{marker.name}</h2>
        <img src={marker.imageUrl} alt={marker.name} style={{ maxWidth: '100%', maxHeight: '100%'}} />
        
      </div>
      </Html>
    );
  }

export default Overlay;

