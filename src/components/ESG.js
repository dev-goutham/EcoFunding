import { useCallback } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdNavigateNext } from "react-icons/md";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import PrevArrow from '../assets/angle-left-solid.webp';
import NextArrow from '../assets/angle-right-solid.webp';
import ESG2 from '../assets/ESG2.png'; 
import { Link } from 'react-router-dom';
import image1 from '../assets/CreditosDeCarbono.webp'
import image2 from '../assets/Sustentabilidade.webp'
import image3 from '../assets/ResponsabilidadAmbiental.webp'
import image4 from '../assets/EntendendoPegadaCarbono.webp'
import image5 from '../assets/EnergiaRenovavel.webp'


import './styleESG.css'
import 'react-animation/dist/keyframes.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* Ensures at least full viewport height */
  background-color: #242a32;
  width: 100%; /* Full width */
  height: auto;
  .prev-arrow{
    margin-top: 100px;
    margin-right: 30px;
    
  }
  .next-arrow{
    margin-top: 100px;
    margin-left: 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
      height: auto;
  }
`;



const Button = styled.button`
  padding: auto;
  margin-bottom: 30px;
  margin-top: 30px;
  height: auto;
  min-height: 60px;
  width: calc(50px + 100%);
  height: calc(50px + 100%);
  cursor: pointer;
  font-family: "Lexend Tera", sans-serif;
  text-transform: uppercase;
  border: 2px solid #2ebc15;
  color: ${({ active }) => (active ? 'white' : '#2ebc15')};
  background: ${({ active }) =>
    active ? '#2ebc15' : 'transparent'};
    @media (max-width: ${breakpoints.tablet}) {
    width: 200px;
    height: 100px;
    padding: 10px 20px;
    margin: 10px auto;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: auto;
  }
  
`;

const ImageDisplay = styled.img`
  max-width: 800px;
  width: 100%;
  height: auto;
  align-self: end;
  border-top-right-radius: 128px;
  z-index: 1;
  margin-left: -7em;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 400px;
    margin-bottom: 1em; // Adjust or remove to ensure it's centered
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 200px;
    margin-left: 0; // Adjust or remove to ensure it's centered
  }
`;


const TextDisplay = styled.p`
  text-align: start;
  color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  word-break: break-word;
  height: auto;
  width: 100%; 
  @media (min-width: ${breakpoints.desktop}) {
    max-width: 800px; /* Optional: Consider if you need a max-width or want it to be fully flexible */
  }
  @media (max-width: ${breakpoints.tablet}) {
    max-width: 600px; /* Adjust according to your responsive design needs */
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 200px; /* Adjust according to your responsive design needs */
  }
`;
 
const TextImage = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 75px;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    margin: 0 30px;
    
  }
`;

const H1 = styled(motion.h1)`
  color: white;
  margin-top: 1em;
  font-family: "Lexend Tera", sans-serif;
  font-size: 2em;
  font-weight: 600;
  @media (max-width: ${breakpoints.tablet}) {
    margin: 20px 10px;
    text-align: center;
  }
`;
const animationOpacity = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 }
  },
};

const ButtonDiv = styled.div`
  width: 100%; /* Ensure it spans the full width of its parent */
  display: flex;
  justify-content: center; /* This will center the button */
  align-items: center;
  margin-top: 3em;
  margin-bottom: -1em;
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%; /* Adjust if necessary */
    margin-bottom: 1em; /* Adjust if necessary */
  }
`;
const CollumnModel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; /* Ensure it takes full width of its parent */
`;

const TextRectangle = styled.div`
  flex-grow: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-top: -0.5em;
  display: flex;
  align-items: center;
  padding: 20px; /* Adjust padding as necessary */
  flex-direction: column;
  width: 100%;
  min-height: 200px; /* Example minimum height */
`;
const TextRectangle2 = styled.div`
  
  padding: 20px;
  flex-direction: column;
  width: 100%;
  text-align: end;
  min-height: 200px;
  margin-right: 200px;
  margin-top: -0.5em;
  display: flex;
  font-family: "Dm sans", sans-serif !important;
  border-radius: 12px;
  white-space: pre-wrap;
  color: #c8c8c8c8;
  @media (max-width: ${breakpoints.tablet}) {
    min-width: 400px;
    margin-right: 0px;
  }
  @media (max-width: 500px) {
    min-width: 100%; // Ensure it takes the full width
    text-align: center; // Center text for mobile
    padding: 10px; // Adjust padding for smaller screens
    margin-right: 0px;
  }
`;

const RowModel = styled.div`
  display: flex;
  flex-direction: row;
  
  justify-content: flex-end; /* This keeps existing spacing behavior */
`;
// New styles for positioning
const Button2 = styled.button`
  margin-top: 50px;
  padding: 10px 20px;
  justify-self: flex-end;
  cursor: pointer;
  border: 2px solid #2ebc15;
  color: ${({ active }) => (active ? 'white' : '#2ebc15')};
  background: ${({ active }) =>
    active ? '#2ebc15' : 'transparent'};
  font-family: "Lexend Tera", sans-serif;
  text-transform: uppercase;
  

  &:hover {
    background-color: #2ebc15;
    color: white;
  
  }

`;
const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: -60px;
z-index: 9999;
width: 90vw;

.next-arrow{
  width: 20px;
  height: 100px;
  
  cursor: pointer;
}
.prev-arrow{
  width: 20px;
  height: 100px;
 
  cursor: pointer;
}
`;

const ESG = ({ id }) => {
  const images = [
    { 
      src: image1, 
      alt: 'Image 1',  
      
      text: `São a chave para um planeta mais verde! Representam uma tonelada métrica de CO2 reduzida, atuando como moeda ambiental vital na luta contra as mudanças climáticas. Entenda melhor sua função e impacto.`,
      button: 'Saiba Mais',
      topico: 'Créditos de Carbono' 
    },
    { 
      src: image2, 
      alt: 'Image 2',  
      
      text: `O futuro começa agora! É o equilíbrio perfeito entre progresso econômico, proteção ambiental e bem-estar social, garantindo um mundo melhor para as próximas gerações.`,
      button: 'Saiba Mais',
      topico: 'Sustentabilidade' 
    },
    { 
      src: image3, 
      alt: 'Image 3',  
      
      text: `Este princípio vital nos convoca a minimizar nosso impacto no planeta, unindo indivíduos, empresas e governos na construção de um futuro sustentável.`,
      button: 'Saiba Mais',
      topico: 'Resp. Ambiental'
    },
    { 
      src: image4, 
      alt: 'Image 4',
      
      text: ` Entenda e Atue! Medindo o total de GEEs emitidos por atividades humanas, esta métrica é chave para combater o aquecimento global. Empresas têm papel crucial na redução dessas emissões, impactando diretamente no futuro do nosso planeta.`,
      button: 'Saiba Mais',
      topico: 'Pegada de Carbono'
    },
    { 
      src: image5, 
      alt: 'Image 5',  
      
      text: `As fontes renováveis como solar, eólica, e hidráulica, são a chave para uma transição energética sustentável, reduzindo emissões e impulsionando a economia.`,
      button: 'Saiba Mais',
      topico: 'Energias Renováveis'
    },
    // Add more image objects as needed
  ];
  const phrasesToStyleGreen = [
    "Créditos de Carbono?",
    "Sustentabilidade",
    "Responsabilidade Ambiental",
    "Pegada de Carbono",
    "Energias Renováveis"
  ];
  
  const stylePhrasesGreen = (text, phrasesToStyle) => {
    let styledText = text;
    phrasesToStyle.forEach((phrase) => {
      styledText = styledText.replace(new RegExp(`(${phrase})`, 'gi'), `<span style="color: #2ebc15; font-weight: bold; font-size: 21px;">$1</span>`);
    });
    return { __html: styledText }; // Return as an object suitable for dangerouslySetInnerHTML
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
   
    <Container as={motion.div} inView={{ opacity: 0.4 }} id={id}>
      <CollumnModel>
      <H1 ref={ref}
          variants={animationOpacity}
          initial="hidden"
          animate={controls}>SAIBA MAIS SOBRE<span style={{ color: '#2ebc15' }}> ESG</span></H1>
 <RowModel>
 <div className="prev-arrow" onClick={handlePrev}><img src={PrevArrow} style={{ color: 'white', height: '20px' }} alt="fesgs"/></div>
      <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          slidesPerGroup={1}
          loop={true}
          navigation={{ nextEl: '.next-arrow', prevEl: '.prev-arrow'}}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          style={{width: '70vw'}}
          className='mySwiper'
          ref={sliderRef}
          breakpoints={{
           
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // When window width is >= 768px (tablet)
    768: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    // When window width is >= 1024px (desktop)
    1024: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  }}
>

  {images.map((image, index) => (
    <SwiperSlide key={index}>
      <ButtonDiv>
        <Button
          active={index === currentIndex}
          onClick={() => setCurrentIndex(index)}
        >
          {image.topico}
        </Button>
      </ButtonDiv>
     
    </SwiperSlide>
  ))}
   
</Swiper>
<div className="next-arrow" onClick={handleNext}><img src={NextArrow} style={{ color: 'white', height: '20px' }} alt="fesgs"/></div>
</RowModel>
      
     
      </CollumnModel>
      <RowModel >
      <TextImage ref={ref}
          variants={animationOpacity}
          initial="hidden"
          animate={controls}
          
          >
        <ImageDisplay src={images[currentIndex]?.src} alt={images[currentIndex]?.alt} />
        <TextRectangle2>
 
  {images[currentIndex].text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}<br />
    
    </React.Fragment>
            ))}
            
  
         
          <Link to={`/Page${currentIndex + 1}`}>
              <Button2>Saiba Mais</Button2>
            </Link>
        </TextRectangle2>
      </TextImage>
      </RowModel>
      
    </Container>

  );
};


export default ESG;
