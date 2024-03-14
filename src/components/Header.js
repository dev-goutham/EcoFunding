import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Logoo from '../assets/LOGOTIPO.svg';
import { useState } from 'react';
// Styled components
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  margin: 2em 100px 0 100px;
  font-family: 'Lexend Tera', sans-serif !important;
  font-weight: 500;
`;

const Logo = styled.img`
  height: 50px; // Adjust size as needed
`;
const Wrapper = styled.div`
  
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

`;
const Nav = styled.nav`
  
  button {
    margin: 0 10px;
    padding: 5px 10px;
    font-family: 'Lexend Tera', sans-serif !important;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 0 10px;
    padding: 5px 10px;
    font-family: 'Lexend Tera', sans-serif !important;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    
  }
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
const DropdownMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 60px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  button {
    margin: 0 10px;
    padding: 5px 10px;
    font-family: 'Lexend Tera', sans-serif !important;
    text-transform: uppercase;
    background-color: transparent;
    border: 1px solid #2ebc15;
    border-radius: 5px;
    cursor: pointer;

    
  }
`;
const Button = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  font-family: 'Lexend Tera', sans-serif !important;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #2ebc15;
`;
const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <StyledHeader>
      <Logo src={Logoo} alt="Logo" />
      <Wrapper>
      <Nav>
        <button>Sobre</button>
        <button>Parceria</button>
        <button>FAQ</button>
      </Nav>
      {!isAuthenticated ? (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      ) : (
        <UserProfile>
          <UserImage src={user.picture} alt={user.name} onClick={toggleDropdown}/>
          {showDropdown && (
            <DropdownMenu>
              <Button onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
            </DropdownMenu>
          )}
        </UserProfile>
      )}
      </Wrapper>
    </StyledHeader>
  );
};

export default Header;