
import React, { useState } from "react";
import styled from "styled-components";
import { RiHomeLine, RiFileCopyLine } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import Badge from "./Badge";
import { useAuth } from "../../config/AuthContext.js"; // Adjust the path as necessary
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { darkThemeColor } from "../../utils";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import pic from "../../assets/user.svg";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { CiFolderOn } from "react-icons/ci";
import { BsCoin } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa";
function Sidebar() {
  const { currentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const userPhoto = currentUser?.photoURL || pic;
  const userName = currentUser?.displayName || "User Name";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
  
    const storage = getStorage();
    // Use the UID directly as the filename, ensuring the path does not create a nested folder structure
    const storageReference = storageRef(storage, `user_images/${currentUser.uid}`);
  
    try {
      const snapshot = await uploadBytes(storageReference, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      await updateProfile(currentUser, {
        photoURL: downloadURL
      });
  
      alert("Profile picture updated successfully!");
      window.location.reload(); // Consider updating the component state instead for a more React-friendly approach
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Error uploading file. Please try again.");
    }
  };
  
  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
     
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to log out.");
    }
  };

  return (
    <Container>
      <ProfileContainer>
        {/* Make the Avatar clickable for uploading an image */}
        <AvatarInput>
          <Avatar src={userPhoto} alt="User Avatar" onClick={() => document.getElementById('fileInput').click()} />
          <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        </AvatarInput>
        {selectedFile && <button onClick={uploadImage} style={{ marginTop: '10px', backgroundColor: '#2ebc15', color: 'white', borderRadius: '16px', padding: '10px' }}>Upload Image</button>}
        <Name>{userName}</Name>
        {/* Logout Button */}
       
      </ProfileContainer>
      <LinksContainer>
        <Links>
          <Li><Link to="/dashboard"><IoMdHome size={30} style={{ marginBottom:'-5px' }} /><span style={{ marginLeft: '10px' }}>Painel de Controle</span></Link></Li>
          <Li><Link to="/dashboard/projetos"><CiFolderOn size={30} style={{ marginBottom:'-5px' }} /><span style={{ marginLeft: '10px' }}>Projetos Investidos</span></Link></Li>
          <Li><Link to="/dashboard/creditosambientais"><BsCoin  size={30} style={{ marginBottom:'-5px' }} /> <span style={{ marginLeft: '10px' }}>Creditos Ambientais</span></Link></Li>
          <Li><Link to="/dashboard/relatorios"><FaNewspaper size={30} style={{ marginBottom:'-5px' }} /><span style={{ marginLeft: '10px' }}>Relatórios e Análises</span></Link></Li>
          <Li><Link to="" style={{ margin: '0 auto' }}><FaGear style={{ height: '20px' }} /></Link></Li>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Links>
        
      
      </LinksContainer>
      
    </Container>
  );
}
const AvatarInput = styled.div`
  cursor: pointer;
  // Style as needed
`;


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
  padding: 2rem;
  height: 60%;
  
`;

const Li = styled.li`
  margin: 0 30px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row; // This ensures horizontal layout
  align-items: center; // Vertically center the items in the list
  gap: 1rem; // Keep some space between the icon and text
  color: #e4e4e4;
  text-transform: uppercase;

  a {
    color: #e4e4e4;
    text-decoration: none;
    display: flex; // Ensures that the link also has a flex display
    align-items: center; // Centers the items vertically within the link
  }
  
  cursor: pointer;
  
  svg {
    margin-bottom: 0px; // Remove the bottom margin from the icon
    width: 50px; // Optional: Set a fixed width for icons for uniformity
    height: 50px; // Optional: Set a fixed height for icons for uniformity
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
