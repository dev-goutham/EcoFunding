
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'react-animation/dist/keyframes.css';
import { MediumAndDown } from './breakpoints.jsx';
import Fundo from '../assets/FUNDO_GLOBO.webp';
import { Link } from 'react-router-dom';
import EcoAlgo from '../assets/EcoAlgo.png'
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    // Call at mount to ensure we have the initial size
    handleResize();

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${Fundo});
  
  background-size: cover;
  width: 100%;
  max-width: 100%;
  height: 60vh;
  margin-top: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    align-items: start;
    margin-top: 400px;
  }

  
  * {
    font-family: 'Lexend Tera', sans-serif;
  }
`;

const Content = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 100px;
  border: none;
  width: 20vw;
  background-color: transparent;
  border: 1px solid #2ebc15;
  color: #2ebc15;
  font-weight: 500;
  font-family: 'Lexend Tera', sans-serif !important;
  text-transform: uppercase;
  margin: 100px 100px 0px auto;
  align-self: flex-end;
  cursor: pointer;
  @media (max-width: 768px){
    
    width: 300px;
    margin: 100px auto 0px auto;
    align-self: center;
  }
  &:hover {
    background-color: #2ebc15;
    color: white;
  }
`;

const Header = styled.h1`
  font-size: 52px;
  margin: 10px 100px;
  color: #2ebc15;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
  font-family: 'Lexend Tera', sans-serif !important;
  @media (max-width: 768px) {
    font-size: 32px; // Adjust font size for mobile
    margin: 0 10px;
    text-align: center; // Center text on mobile
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 30px;
  margin: 0 100px;
  margin-right: 105px;
  word-break: break-word;
  color: #c8c8c8c8;
  font-weight: 300;
  font-family: 'Dm sans', sans-serif !important;
  text-align: end;
  @media (max-width: 768px) {
    font-size: 18px; // Adjust font size for mobile
    margin: 0 10px;
    text-align: center; // Center text on mobile
  }
`;
const Image = styled.img`
  max-width: 500px;
  
  
  margin-top: 1rem;
  @media (max-width: 768px) {
    max-width: 150px;
    
  } 
  @media (max-width: 1308px) {
    max-width: 300px;
  }
`

const OverlayContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  
`;
const ButtonContainer = styled.div`
  width: 100%; // Ensures the container spans the full width
  text-align: right; // Aligns the button to the right

  @media (max-width: 991px){
    text-align: center; // Adjusts the alignment for mobile
    margin-bottom: 2rem; // Adds margin to the bottom for spacing
  }
  
`;
// Animation Variants
const slideInFromLeft = {
  hidden: { x: -100, opacity: 0.5 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
};

// Component
const OqueFazemos = ({ id }) => {
  const [showContent, setShowContent] = useState(true);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const { width } = useWindowSize(); // Use the custom hook

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);
  
  return (
    <Container id={id}>
      
      <Image src={EcoAlgo} />
      
      {showContent && (
        <Content show={showContent}>
          <ColumnFlex>
            <Header>ECO-ALGORITMO</Header>
            <Paragraph
              ref={ref}
              variants={slideInFromLeft}
              initial="hidden"
              animate={controls}
            >
               Nossa I.A. de classificação de projetos ESG
            </Paragraph>
            <ButtonContainer>
           
            </ButtonContainer>
          </ColumnFlex>
        </Content>
      )}
    </Container>
  );
};

export default OqueFazemos;