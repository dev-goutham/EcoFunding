import React from 'react';
import OqueFazemos from '../../components/OqueFazemos';
import SelosSection from '../../components/Selos';
import ESG from '../../components/ESG';
import Parceiros from '../../components/Parceiros';
import FAQ from '../../components/FAQ';
import Blog from '../../components/Blog';
import Rodape from '../../components/Rodape';
import HomeCarousel from '../../components/Home';
import styled from 'styled-components';

import FormContainer from '../../containers/FormContainer';

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