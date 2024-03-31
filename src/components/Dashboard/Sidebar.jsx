
import React from "react";
import styled from "styled-components";
import { RiHomeLine, RiFileCopyLine } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import Badge from "./Badge";
import { useAuth } from "../../config/AuthContext.js"; // Adjust the path as necessary
import { darkThemeColor } from "../../utils";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";



function Sidebar() {
  const { currentUser } = useAuth();

  const userPhoto = currentUser?.photoURL || "path/to/default/avatarImage.jpeg"; 
  const userName = currentUser?.displayName || "User Name";

  // Adjusted Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Using auth from useAuth
      window.location.reload(); // Refresh the page after successful logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <Avatar src={userPhoto} alt="User Avatar" />
        <Name>{userName}</Name>
        <Badge content="Investidor Nivel 1" />
      </ProfileContainer>
      <LinksContainer>
        <Links>
          <Link>
            <RiHomeLine />
            <h3>Dashboard</h3>
          </Link>
          <Link>
            <RiFileCopyLine />
            <h3>Projects</h3>
          </Link>
          <Link>
            <FaWallet />
            <h3>Invoices</h3>
          </Link>
          <Link>
            <AiOutlinePieChart />
            <h3>Reports</h3>
          </Link>
          
         
          {/* Logout Button */}
          <LogoutButton onClick={logout}>
            <h3>Logout</h3>
          </LogoutButton>

        </Links>
        <ContactContainer>
          <span>Having troubles?</span>
          <a >Contact us</a>
        </ContactContainer>
      </LinksContainer>
    </Container>
  );
}


const Container = styled.div`
  width: 20%;
  height: 100% !important;
  background-color: #242a32;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 auto;
`;

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;

const Name = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;

const LinksContainer = styled.div`
  background-color: #3f4c5c;
  height: 100%;
  width: 100%;
  border-top-right-radius: 2rem;
  border-top-left-radius: 2rem;
  
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  height: 60%;
`;

const Link = styled.li`
  margin: 0 30px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  color: #e4e4e4;
  align-items: center;
  
  cursor: pointer;
  h3 {
    font-weight: 300;
  }
  svg {
    font-size: 1.1rem;
    margin-top: 3%;
  }
`;

const ContactContainer = styled.div`
  width: fit-content;
  background-color: #242a32;
  color: #c4c4c4;
  height: auto;
  margin: auto auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  a {
    color: white;
    text-decoration: none;
  }

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-bottom: 2rem;
  }
`;
const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #2ebc15;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background-color: #249a12; // Slightly darker shade for hover effect
  }

  h3 {
    margin: 0; // Remove margin from h3 to align text properly within the button
  }

  svg {
    font-size: 1.1rem; // Adjust if you have an icon inside the button
  }
`;

export default Sidebar;
