

import React, { useState, useRef, useContext, Component, useEffect } from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import FolhaEsquerda from '../assets/FolhaEsquerda.webp';
import HomeSection1 from '../assets/HomeSection1.webp';	
import HomeSection2 from '../assets/HomeSection3.webp';	
import HomeSection3 from '../assets/HomeSection2.webp';	
import folhaesquerdacima from '../assets/FolhaEsquerdaCima.webp';
import folhadireitabaixo from '../assets/FolhaDireitaBaixo.webp';
import homeSection from '../assets/HomeSection.png';
import '../components/home.css';

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



const Wrapper = styled.section`
  background: white;
  text-align: center;
  justify-content: center;
  align-items: center;
  
  margin-top: 2em;
  margin-bottom: 2em;
  width: 100vw;
  height: auto;
  gap: 10em;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
    
    margin: 0 20px;
  }
`;

const FrameText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  margin-top: -10em;
  width: 700px;
  overflow: visible;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 3em;
    margin-left: 5em;
    margin-top: -2em;
    

  }
`;

const FrameImage = styled.div`

  position: relative;
  margin-left: 2em;
  width: 33vw;
  height: 500px;
  overflow: visible;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: -10em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
  }
`;


const ResponsiveImage = styled.img`
  max-width: 100%; // Ensures the image is never larger than its container
  height: auto; // Maintains the aspect ratio of the image
  border-top-left-radius: 90px;
  @media (max-width: 768px) {
    width: 80%; // Scales the image to 80% of its container's width on small devices
    margin-top: 12em;
  }
  
  @media (min-width: 1025px) {
    width: 95%; // Scales the image to 95% of its container's width on large devices
  }
`;

const ResponsiveFolhaMeio = styled.img`
  position: absolute;
  z-index: 1000;
  left: -100px;
  height: auto;
  transition: transform 0.35s ease-out;
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    display: none;
  }
`;

const ResponsiveFolhaDireita = styled.img`
  position: absolute;
  width: 30%;
  height: 30%;
  z-index: 1000;
  right: 0;
  bottom: 0;
  
  transition: transform 0.35s ease-out;
`;



const ParallaxFolha = styled.img`
  width: 25%;
  height: auto;
  position: sticky;
  z-index: 1000;
  top: 500px;
  margin-left: -100px;
  user-select: none;
  
  transition: transform 0.35s ease-out;
  

  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 5%;
  }
  @media (min-width: 1025px) {
    max-width: 20%;
  }
`;

const ParallaxFolhaCima = styled.img`
  width: 5%;
  height: auto;
  position: sticky;
  z-index: 1000;
  left: 400px;
  bottom: 200px;
  transition: transform 0.35s ease-out;
  user-select: none;
`;


const Wrapper2 = styled.div`
   
    .controls {
      display: flex;
      
      justify-content: center;
  
      .btn-arrow {
        border: none;
        background: none;
        padding: 11px 20px;
      }
  
      .reverse-arrow {
        transform: rotateY(180deg);
      }
  
      .dot-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
  
        .carousel__dot {
          width: 8px;
          height: 8px;
          border: none;
          border-radius: 50%;
          margin: 0 4px;
          padding: 0;
          background-color: #c3c4ca;
        }
  
        /* This class is found in DotGroup from pure-react-carousel */
        /* We need to override it to add our styles */
        .carousel__dot--selected {
          width: 8px;
          height: 8px;
          border-radius: 10px;
          background-color: #6267a1;
          transition: background 0.4s ease;
        }
      }
    }
  `;
const Paragraph1 = styled.p`
  margin-bottom: 2em;
  margin-top: 5px;
  font-weight: 300;
  font-size: 22px;
  font-family: 'Lexend Tera';
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 8px;
  
  }
`;
const H11 = styled.h1`
text-transform: uppercase;
font-family: 'Lexend Tera';
font-weight: 700;
width: 100%;
color: #242a32;
min-width: 30vw;

text-align: start;
font-size: 24px;
margin-right: 50px;
@media (max-width: 768px) {
    font-size: 12px;
  
  }

  

`;
const Button1 = styled.button`
  padding: 10px 50px;
  color: ${props => props.buttonText === 'Regulada pela CVM' ? 'white' : '#242a32'}; // Initial color
  background-color: ${props => props.buttonText === 'Regulada pela CVM' ? '#242a32' : 'transparent'}; // Conditional background color
  border: ${props => props.buttonText === 'Regulada pela CVM' ? '1px solid #242a32' : '1px solid #242a32'} ; // Set border-color and assume a default border style of solid
  font-family: 'Lexend Tera';
  font-weight:550;
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 2em;
  @media (max-width: 768px) {
    font-size: 8px;
    

  }

  
  &:hover {
    color: ${props => props.buttonText === 'Regulada pela CVM' ? '#242a32' : 'white'}; // New text color on hover
    background-color: ${props => props.buttonText === 'Regulada pela CVM' ? 'transparent' : '#242a32'}; // New background color on hover
  }
`;
const StyledCarouselProvider = styled(CarouselProvider)`
  height: 95vh;
`;

const Home = ({ imgurl, altText, title, paragraph, button, transform }) => {
  const { width } = useWindowSize(); // Use the custom hook

  // Function to render title with conditional line breaks
  const renderTitle = (title) => {
    // Define the substring to break the line before, case-insensitive
    const breakBefore = "eco-sustentável";
    const breakBeforeRegex = new RegExp(`(${breakBefore})`, 'i'); // 'i' flag for case-insensitive
    const match = title.match(breakBeforeRegex);
  
    if (match) {
      // If the title contains the substring where we want to insert a line break
      const splitIndex = match.index;
      return (
        <>
          {title.substring(0, splitIndex)}
          <br />
          {title.substring(splitIndex)}
        </>
      );
    }
    return title; // No specific break point found, return the title as is
  };
 
  return (
    <Wrapper>
      <Container>
        <FrameText>
          <H11>{renderTitle(title)}</H11>
          <Paragraph1>{paragraph}</Paragraph1>
          <Button1 buttonText={button}>{button}</Button1>
        </FrameText>
        <FrameImage>
          <ResponsiveImage src={imgurl} alt={altText} />
          
        </FrameImage>
      </Container>
    </Wrapper>
  );
};


const slidesData = [
  {
    key: 'slide1',
    src: HomeSection1,
    alt: 'An image description',
    title: 'Nascemos para conectar propósitos sustentáveis a realidades transformadoras',
    paragraph: 'Somos a primeira plataforma corporate crowdfunding de investimentos sustentáveis do Brasil.',
    button: 'Regulada pela CVM'
  },
  {
    key: 'slide2',
    src: HomeSection3,
    alt: 'Seja um investidor eco-sustentável',
    title: `Torne-se um investidor EcoSustentável`,
    paragraph: 'Transforme seu débito em crédito ambiental.',
    button: 'CADASTRE-SE'
    
  },
  {
    key: 'slide2',
    src: HomeSection2,
    alt: 'Another image description',
    title: `Torne-se um parceiro Ecosustentável`,
    paragraph: 'Analisamos a viabilidade de seu projeto.',
    button: 'CADASTRE-SE'
  },
  // Add more slide objects as needed
];

const HomeCarousel = () => {
  const [slideHeight, setSlideHeight] = useState(40); // Default slide height
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });
  const folhaCimaRef = useRef(null);
  const folhaRef = useRef(null);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const mouseX = (clientX - innerWidth / 2) / innerWidth * 100; // Percentage from the center
    const mouseY = (clientY - innerHeight / 2) / innerHeight * 100;

    setMousePosition({ mouseX, mouseY });

    if (folhaCimaRef.current) folhaCimaRef.current.style.transform = `translate(${mouseX * 0.3}%, ${mouseY * 0.3}%)`;
    if (folhaRef.current) folhaRef.current.style.transform = `translate(${mouseX * 0.3}%, ${mouseY * 0.3}%)`;
  };
  const updateDimensions = () => {
    const windowWidth = window.innerWidth;
  
    switch (true) {
      case windowWidth < 668:
        setSlideHeight(140); // Example: Increase height for smaller screens
        break;
      case windowWidth >= 668 && windowWidth < 1604:
        setSlideHeight(27); // Hypothetical case: Medium screens
        break;
      case windowWidth >= 1254:
        setSlideHeight(90); // Reset to default for larger screens
        break;
      case windowWidth >= 1604:
        setSlideHeight(20); // Reset to default for larger screens
        break;
      default:
        // Optionally handle any unexpected cases
        console.log("Unhandled window width: ", windowWidth);
    }
  };

  useEffect(() => {
    updateDimensions(); // Set initial value
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <StyledCarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={slideHeight}
      totalSlides={slidesData.length}
      style={{ marginTop: '-8em' }}
    >
        <Wrapper2 onMouseMove={handleMouseMove}>
        <ParallaxFolha ref={folhaRef} src={FolhaEsquerda} alt="folha"/>
        <ParallaxFolhaCima ref={folhaCimaRef} src={folhaesquerdacima} />
          <Slider>
            {slidesData.map((slide, index) => (
              <Slide index={index} key={slide.key}>
                <Home
                  style={{ overflow: 'visible'}}
                  imgurl={slide.src}
                  altText={slide.alt}
                  title={slide.title}
                  paragraph={slide.paragraph}
                  button={slide.button}
                  transform={`translate(${mousePosition.mouseX * 0.3}%, ${mousePosition.mouseY * 0.3}%)`}
                />
              </Slide>
            ))}
          </Slider>
          <div className="controls">
            <DotGroup style={{ marginBottom: '50px' }} className="dot-group" />
          </div>
          
        </Wrapper2>
      </StyledCarouselProvider>
    );
  };
export default HomeCarousel;
