import { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/LOGOTIPO.webp";
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  .nav_logo {
    margin-left: 40px;
    width: 20vw;
    
    @media (max-width: 768px) {
      width: 50vw;
      margin-left: 0;
      margin-top: 20px;
    }
  }
  
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 1.5em;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 2;

    @media screen and (max-width: 768px) {
      display: block;
    }
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-right: 40px;
  
  li {
    margin-right: 1em;
    
    &:hover {
      cursor: pointer;
      border-radius: 4px;
    }
  }

  .nav-menu-list, .nav-menu-list1 {
    text-decoration: none;
    color: black;
    display: block;
    padding: 0.5em;
    a {
      color: black;
      text-decoration: none;
    }
    
  }

  .nav-menu-list:hover {
    box-shadow: 0px 1.5px 0px #2ebc15;
  }

  .nav-menu-list1 {
    border: 1px solid white;
    background-color: #2ebc15;
    color: white;
    a {
      color: white;
      text-decoration: none;
    }
    &:hover {
      background-color: transparent;
      color: black;
      border: 1px solid black;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1em;
    display: ${props => props.isToggleOpen ? "flex" : "none"};
  }
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

const Div = styled.div`
  padding: 20px;
  @media (max-width: 768px){
    padding: 0px;
  }
`;

// Header component
const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with ID ${sectionId} not found`);
    }
  };

  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <Div>
      <StyledHeader>
        <div className="nav_logo">
          <a href="/" onClick={handleToggleOpen}>
            <Img src={Logo} alt="ECOFUNDING" />
          </a>
        </div>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
        <NavMenu isToggleOpen={isToggleOpen}>
          <li className="nav-menu-list"><a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')}>SOBRE</a></li>
          <li className="nav-menu-list"><a href="#parceria" onClick={(e) => handleScroll(e, 'parceria')}>PARCERIA</a></li>
          <li className="nav-menu-list"><a href="#faq" onClick={(e) => handleScroll(e, 'faq')}>FAQ</a></li>
          <li className="nav-menu-list1"><a href="#rodape" onClick={(e) => handleScroll(e, 'rodape')}>CONTATO</a></li>
        </NavMenu>
      </StyledHeader>
    </Div>
  );
};

export default Header;
