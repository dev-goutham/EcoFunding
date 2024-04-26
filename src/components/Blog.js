import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
const Container = styled.div`
    height: 90vh;
    width: 90vw;
    justify-content: center;
    align-items: center;
`;

const Blog = () => {
    return (
        <Container>
           <Swiper 
            spaceBetween={10}
            slidesPerView={3}
            navigation={true} modules={[Navigation]} className="mySwiper"
            >
                <SwiperSlide>
                     <h1>Slide 1</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 2</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 3</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 4</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 5</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 6</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 7</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 8</h1>
                </SwiperSlide>
                <SwiperSlide>
                     <h1>Slide 9</h1>
                </SwiperSlide>
           </Swiper>
        </Container>
    );
}
export default Blog;