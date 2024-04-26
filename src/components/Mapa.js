import React, { Suspense, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { Earth } from './earth';
import { MarkerProvider, useMarker } from './earth/MarkerContext';
import ZoomButtons from './ZoomButtons';
import { Html } from '@react-three/drei'; // Import the Html component
import Overlay from './Overlay';
import markers from './earth/markers';


function Mapa() {
    
    const { selectedMarker, closeOverlay } = useMarker(); // Use the custom hook

    return (
     
        <div style={{ width: '100%', height: '100vh' }}>
           
            <Canvas>
            <Suspense fallback={<Html><div style={{color: 'white'}}>Loading...</div></Html>}>
                    <Earth />
                    <ZoomButtons />
                    {selectedMarker && <Overlay marker={selectedMarker} onClose={closeOverlay} />}
             
                </Suspense>
            </Canvas>
        </div>
     
    );
}

export default Mapa;