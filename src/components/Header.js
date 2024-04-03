import { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/LOGOTIPO.webp";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
const StyledHeader = styled.header`
  
  width: 100%;
  display: flex;
  
  align-items: center;
  justify-content: space-between;
  position: relative; // Ensure proper stacking
  
  
  .nav_logo {
    margin-left: 40px; // Adjust margin for spacing
    text-align: left; // Default to left alignment
    width: 20vw; 
    @media (max-width: 768px){
      text-align: left; // Center the content on smaller screens
       // Center the content on smaller screens
      width:  50vw;
      height: 100px;
      margin-top: 20px;
      overflow: visible; // Hide overflow content
      margin-left: -10em; // Reset margin
    }
  }
  
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 1.5em; // Use em for scalability
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 2; // Ensure it's above other content

    @media screen and (max-width: 768px) {
      display: block;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavManu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  color: black;
  margin-right: 40px; // Adjust margin for spacing
  li {
    margin-right: 1em; // Use em for spacing between items

    &:hover {
      cursor: pointer;
      border-radius: 4px;
      
      
    }
  }

  .nav-menu-list, .nav-menu-list1 {
    text-decoration: none;
    color: black;
    display: block;
    padding: 0.5em; // Use em for padding
    

   
  }
.nav-menu-list{
     
  &:hover{
     box-shadow: 0px 1.5px 0px #2ebc15;
   }
}
  .nav-menu-list1 {
    border: 1px solid white;
    background-color: #2ebc15;
    color: white;
    &:hover{
      background-color: transparent;
      color: black;
      border: 1px solid black;
      }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px; /* Add margin bottom for spacing */
    margin-top: 1em; // Adjust top margin
    display: ${props => props.isToggleOpen ? "flex" : "none"}; // Use flex to align items vertically
  }
`;

const Img = styled.img`
    max-width: 100%; // Ensure logo is responsive
    height: auto; // Maintain aspect ratio
    @media (max-width: 768px){
    
    }
`;
const Div = styled.div`
    padding: 20px;  
   @media (max-width: 768px){
   padding: 0px;
    }
`;const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error(`Element with ID ${sectionId} not found`);
  }
};


const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleScroll = (event, sectionId) => {
    event.preventDefault(); // Prevent default action of opening a new tab or navigating away
    document.querySelectorAll('[id]').forEach((el) => console.log(el.id));
    scrollToSection(sectionId);
  };
  const handleNavigation = () => {
    navigate("/login"); // Use the path to your register route
};
  return (
    <Div>
      <StyledHeader>
        <div className="nav_logo">
          <a href="/" onClick={handleToggleOpen}>
            <Img src={Logo} alt="ECOFUNDING" />
          </a>
        </div>

        <NavManu isToggleOpen={isToggleOpen}>
          {/* Correctly use <a> elements with href="#" and prevent default behavior */}
          <li><a href="#sobre" className="nav-menu-list" onClick={(e) => handleScroll(e, 'sobre')}>SOBRE</a></li>
          <li><a href="#parceria" className="nav-menu-list" onClick={(e) => handleScroll(e, 'parceria')}>PARCERIA</a></li>
          <li><a href="#faq" className="nav-menu-list" onClick={(e) => handleScroll(e, 'faq')}>FAQ</a></li>
          <li><a href="#rodape" className="nav-menu-list1" onClick={(e) => handleScroll(e, 'rodape')}>CONTATO</a></li>
          <li><a className="nav-menu-list1" onClick={handleNavigation}> DASHBOARD </a></li>
        </NavManu>
        <FaBars style={{ fill: 'black' }} className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </Div>
  );
};

export default Header;