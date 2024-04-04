
import React from 'react';
import styled from 'styled-components';
import Selo1 from '../assets/selo1.webp';
import Selo2 from '../assets/selo2.webp';
import Selo3 from '../assets/selo3.webp';
import Selo4 from '../assets/selo4.webp';

const SelosContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap to the next line on smaller screens */
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 60px 0; /* Add some padding */
  width: 100%;
`;

const Selos = styled.img`
  max-width: 7%; /* Ensures image is responsive and scales with its container */
  height: auto; /* Maintains aspect ratio */
  flex: 1 1 200px; /* Flex item to allow it to grow and shrink, with a base width of 200px */

  @media (max-width: 768px) {
    flex: 1 1 150px; /* On smaller screens, reduce the base width */
  }

  @media (max-width: 480px) {
    flex: 1 1 100px; /* On very small screens, further reduce the base width */
  }
`;

const SelosSection = () => {
  return (
    <SelosContainer>
      <Selos src={Selo1} alt="EcoFundingGiant" />
      <Selos src={Selo2} alt="EcoFundingGiant" />
      <Selos src={Selo3} alt="EcoFundingGiant" />
      <Selos src={Selo4} alt="EcoFundingGiant" />
    </SelosContainer>
  );
};

export default SelosSection;