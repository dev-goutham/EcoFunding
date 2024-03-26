import React from 'react';
import OqueFazemos from '../../components/OqueFazemos.js';
import SelosSection from '../../components/Selos.js';
import ESG from '../../components/ESG.js';
import FAQ from '../../components/FAQ.js';
import Rodape from '../../components/Rodape.js';
import HomeCarousel from '../../components/Home.js';
import styled from 'styled-components';

import FormContainer from '../../containers/FormContainer.jsx';

const RodapeWrapper = styled.div`
@media (max-width: 768px) {
    display: none;
}
`;

const HomePage = () => {
    return (
        <div>
        
        <HomeCarousel />
        <OqueFazemos id="sobre"/>
        <SelosSection />
        <ESG />
        
        <FormContainer id="parceria"/>
        
        <FAQ id="faq"/>
        
        <Rodape id="rodape"/>
        
        
        </div>
    )
}
export default HomePage;