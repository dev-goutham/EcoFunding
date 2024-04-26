import React from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";

const Button = styled.button`
        position: relative;
        left: -50%;
        background-color: transparent;
        border: none;
    `;
function ZoomButtons() {
    const { camera } = useThree();
    
    const zoomIn = () => {
        camera.position.z -= 1;
        camera.updateProjectionMatrix();
    };
    
    const zoomOut = () => {
        camera.position.z += 1;
        camera.updateProjectionMatrix();
    };
    let iconStyles = { color: "white", fontSize: "1.5em" };
    return (
        
        <Html style={{ position: 'absolute', marginTop: '-35vh', zIndex: 100, display: 'flex', flexDirection: 'collumn'}}>
            
            <Button onClick={zoomIn}><FaMagnifyingGlassPlus style={iconStyles}/></Button>
            <Button onClick={zoomOut}><FaMagnifyingGlassMinus style={iconStyles}/></Button>
           
        </Html>

    );
}

export default ZoomButtons;