import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: Import the effect you want to use

import Selo1 from '../assets/selo1.webp';
import Selo2 from '../assets/selo2.webp';
import Selo3 from '../assets/selo3.webp';
import Selo4 from '../assets/selo4.webp';

const SelosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 60px 0;
  width: 100%;
`;

const StyledLazyImage = styled(LazyLoadImage)`
  max-width: 100px;
  
  height: auto;
  flex: 1 1 200px;

  @media (max-width: 768px) {
    flex: 1 1 150px;
  }

  @media (max-width: 480px) {
    flex: 1 1 100px;
  }
`;

const SelosSection = () => {
  return (
    <SelosContainer>
      <StyledLazyImage src={Selo1} alt="EcoFundingGiant" effect="blur" />
      <StyledLazyImage src={Selo2} alt="EcoFundingGiant" effect="blur" />
      <StyledLazyImage src={Selo3} alt="EcoFundingGiant" effect="blur" />
      <StyledLazyImage src={Selo4} alt="EcoFundingGiant" effect="blur" />
    </SelosContainer>
  );
};

export default SelosSection;
