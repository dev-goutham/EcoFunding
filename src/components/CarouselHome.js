import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import Image from '../assets/HomeSection.png';
import { Navigation } from 'swiper/modules';
import styled from 'styled-components';
import FolhasImg from '../assets/folhas1.png';
import FolhaEsquerda from '../assets/FolhaEsquerda.png';
const InnerCarousel = styled.div`
    display: flex; // Use flexbox to center the image
    justify-content: center; // Center horizontally
    align-items: center; // Center vertically
    height: 110vh; // Make sure the card takes the full height of the viewport
    overflow-x: hidden;
`;
const Texts = styled.div`
    padding: 4em;
    max-width: 30vw;
`;
const Images = styled.img`
    min-width: 10vw;
    max-width: 60vw;
    min-height: 10vh;
    max-height: 60vh;
    border-radius: 60px;
    `;
const H1 = styled.h1`
    font-size: 36px;
    font-family: 'Montserrat', sans-serif;
    `;
const Paragraph = styled.p`
    font-size: 16px;
    color: black;
    font-family: 'Mont-serrat', sans-serif;
    max-width: 30vw;
    word-break: break-all;
    `;

const Folhas = styled.div`
    pointer-events: none;
    z-index: 10;
    position: absolute;
    overflow-x: hidden;
`;
const FolhasImagem = styled.img`
    
    pointer-events: none;
`;
export default function CarouselHome() {
  return (
    <>
   
    <Folhas  style={{ alignSelf: 'end', height: 'h'}}><FolhasImagem src={FolhaEsquerda} style={{ alignSelf: 'end'}} /></Folhas> 
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide style={{ height: '80vh' }}>
                <InnerCarousel>
                    <Texts>
                        <H1>eCO Funding</H1>
                        <Paragraph>ParagraphParagraphParagraphParagraphParagrapParagraphParagraphParagraphParagraphParagraph </Paragraph>
                    </Texts>
                    <Images src={Image} alt="carousel" />
                </InnerCarousel>
            </SwiperSlide>
        <SwiperSlide style={{ height: '80vh' }}>
            <InnerCarousel>
                <Texts>
                    <H1>Header</H1>
                    <Paragraph>Paragraph</Paragraph>
                </Texts>
                <Images src={Image} alt="carousel" />
            </InnerCarousel>
        </SwiperSlide>
        <SwiperSlide style={{ height: '80vh' }}>
            <InnerCarousel>
                <Texts>
                    <H1>Header</H1>
                    <Paragraph>Paragraph</Paragraph>
                </Texts>
                <Images src={Image} alt="carousel" />
            </InnerCarousel>
        </SwiperSlide>
        <SwiperSlide style={{ height: '80vh' }}>
            <InnerCarousel>
                <Texts>
                    <H1>Header</H1>
                    <Paragraph>Paragraph</Paragraph>
                </Texts>
                <Images src={Image} alt="carousel" />
            </InnerCarousel>
        </SwiperSlide>
        <SwiperSlide style={{ height: '80vh' }}>
            <InnerCarousel>
                <Texts>
                    <H1>Header</H1>
                    <Paragraph>Paragraph</Paragraph>
                </Texts>
                <Images src={Image} alt="carousel" />
            </InnerCarousel>
        </SwiperSlide>
        <SwiperSlide style={{ height: '80vh' }}>
            <InnerCarousel>
                <Texts>
                    <H1>Header</H1>
                    <Paragraph>Paragraph</Paragraph>
                </Texts>
                <Images src={Image} alt="carousel" />
            </InnerCarousel>
        </SwiperSlide>
      </Swiper>
        
    </>
  );
}
