import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Eco from "../assets/LOGOTIPOcopy.svg";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";

import { firestore } from '../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const Collumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  `;
const StyledHeader = styled.header`
  background-color: #242a32;
  padding: 37px 40px; /* Adjusted for mobile */
  font-size: 8px; /* Adjusted for mobile */
  @media (max-width: 991px) {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
`;

const MainContent = styled.main`
  display: flex;
  gap: 10px; /* Adjusted for mobile */
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 50%; /* Adjusted for mobile */
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 50%; /* Adjusted for mobile */
  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%;
    margin-left: 0; /* Adjusted for mobile */
  }
`;

const Logo = styled.img`
  max-width: 50%; /* Adjusted for mobile */
  @media (max-width: 991px) {
    max-width: 300px;
    margin: 0 auto
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 42.5px; /* Adjusted for mobile */
  justify-content: START;
  gap: 50px; /* Adjusted for mobile */
  @media (max-width: 991px) {
    flex-wrap: wrap;
    justify-content: center
  }
`;

const IconImg = styled.img`
  width: 20.5px; /* Adjusted for mobile */
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: column;
  color: #c8c8c8c8;
  padding: 50px; /* Adjusted for mobile */
  font-size: 6.5px; /* Adjusted for mobile */
  @media (max-width: 991px) {
    margin-right: 2.5em; /* Adjusted for mobile */
    margin-left: 2.5rem; /* Adjusted for mobile */
  }
  @media (min-width: 992px) {
    font-size: 12px; /* Adjusted for mobile */
    a {
      margin-top: 20px; /* Adjusted for mobile */
      cursor: pointer;
      color: #c8c8c8;
      text-decoration: none;
    }
  }
  @media (min-width: 300px) {
    font-size: 12px; /* Adjusted for mobile */
    a {
      margin-top: 20px; /* Adjusted for mobile */
      cursor: pointer;
      color: #c8c8c8;
      text-decoration: none;
    }
  }
`;

const NewsletterSection = styled.section`
  display: flex;
  flex-direction: column;
  color: #c8c8c8;
  font-size: 8px; /* Adjusted for mobile */
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 15px; /* Adjusted for mobile */
  padding-left: 6.5px; /* Adjusted for mobile */
  border: 1px solid #2ebc15;
`;

const NewsletterInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  color: #fff;
  &::placeholder {
    color: #828282;
  }
`;

const SubmitButton = styled.button`
  background-color: rgba(46, 188, 21, 1);
  border: none;
  color: #fff;
  height: 100%;
  padding: 10px 7.5px; /* Adjusted for mobile */
  cursor: pointer;
`;

const ContentText = styled.p`
  color: #465363;
  font-size: 6.5px; /* Adjusted for mobile */
  line-height: 1.6;
  margin-top: 100px; /* Adjusted for mobile */
`;
const StyledRow = styled.div`
@media (max-width: 991px) {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

`;
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error(`Element with ID ${sectionId} not found`);
  }
};

function Rodape() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      const docRef = await addDoc(collection(firestore, "newsletter"), {
        email: email,
        timestamp: new Date(), // Optional: Add a timestamp
      });
      console.log("Document written with ID: ", docRef.id);
      setEmail(''); // Clear the input after successful submission
      // Optional: Show a success message to the user
    } catch (e) {
      console.error("Error adding document: ", e);
      // Optional: Show an error message to the user
    }
  };
  const handleScroll = (event, sectionId) => {
    event.preventDefault(); // Prevent default action of opening a new tab or navigating away
    document.querySelectorAll('[id]').forEach((el) => console.log(el.id));
    scrollToSection(sectionId);
  };

  return (
    <StyledHeader>
      <MainContent>
        <Sidebar>
          <Logo src={Eco} alt="Logo" />
          <SocialMediaIcons>
            <a href="mailto:contato@ecofunding.com.br"><IconImg src={Image1} alt="Icon 1" /></a>
            <a href="https://www.instagram.com/ecofundinginvest/"><IconImg src={Image2} alt="Icon 2" href=""/></a>
            <a href="https://www.linkedin.com/company/ecofunding/about/"><IconImg src={Image3} alt="Icon 3" href=""/></a>
            
            </SocialMediaIcons>
        </Sidebar>
        <ContentWrapper>
          <StyledRow>
          <Navbar>
            <div style={{ fontFamily: 'Lexend Tera', fontWeight: 500, fontSize: '12px', color: 'rgba(255, 255, 255, 1)' }}>EMPRESA</div>
            <a onClick={(e) => handleScroll(e, 'sobre')}>Início</a>
            <a onClick={(e) => handleScroll(e, 'parceria')}>Parcerias</a>
            <a >Contato</a>
          </Navbar>
          <Navbar>
            <div style={{ fontFamily: 'Lexend Tera', fontWeight: 500, fontSize: '12px', color: 'rgba(255, 255, 255, 1)' }}>SERVIÇOS</div>
            <a href="https://www.gov.br/cvm/pt-br">CVM</a>
            <a href="https://semil.sp.gov.br/">SEMIL</a>
            <a onClick={(e) => handleScroll(e, 'esg')}>ESG</a>
            
          </Navbar>
          </StyledRow>
          <Collumn>
            <NewsletterSection>
              <div>SE INSCREVA NA NOSSA <span style={{ fontWeight: 600, color: "rgba(46,188,21,1)" }}>NEWSLETTER</span></div>
              <NewsletterForm onSubmit={handleSubmit}>
                <NewsletterInput type="email" placeholder="Digite seu e-mail" aria-label="Digite seu e-mail" value={email} onChange={handleEmailChange} />
                <SubmitButton type="submit" >Enviar</SubmitButton>
              </NewsletterForm>
            </NewsletterSection>
          </Collumn>
        </ContentWrapper>
      </MainContent>
      <ContentText>
        "Acreditamos que o futuro do nosso planeta está diretamente ligado a uma economia mais sustentável, onde a tecnologia desempenha um papel crucial no processo como um todo. Buscamos simplificar e democratizar o acesso a soluções sustentáveis, capacitando tanto pessoas quanto empresas a contribuírem ativamente para a preservação do nosso futuro e do meio ambiente.
        
        Temos como compromisso principal, desenvolver soluções ambientais inovadoras que permitem diversas tipos de empresas a compensarem suas emissões de carbono de maneira descomplicada e segura. Estamos empenhados em facilitar e promover a adoção de práticas mais conscientes, promovendo assim um movimento efetivo em prol da sustentabilidade global.
        
        Somos a ECOFUNDING, uma eco/fintech que nasceu pela inconformidade dos sócios em acreditarem que o futuro não está tão distante como a maioria das pessoas acreditam e que nós não herdamos a Terra dos nossos antepassados, simplesmente pegamos emprestada de nossos filhos."
      </ContentText>
    </StyledHeader>
  );
}

export default Rodape;