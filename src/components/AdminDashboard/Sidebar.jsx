import React, { useState } from "react";
import styled from "styled-components";
import { RiHomeLine, RiFileCopyLine } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import { getFirestore, doc, updateDoc } from "firebase/firestore"; // Import Firestore

import { useAuth } from "../../config/AuthContext.js"; // Adjust the path as necessary
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { darkThemeColor } from "../../utils";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { CiFolderOn } from "react-icons/ci";
import { BsCoin } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa";
import pic from "../../assets/user.svg";


function Sidebar() {
  const { currentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const userPhoto = currentUser?.photoURL || pic;
  const userName = currentUser?.displayName || "User Name";



  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile || !currentUser) return;
  
    const storage = getStorage();
    const firestore = getFirestore(); // Initialize Firestore
  
    // Assuming you store user images by UID
    const storageReference = storageRef(storage, `user_images/${currentUser.uid}`);
    
    try {
      const snapshot = await uploadBytes(storageReference, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Update the Firebase Authentication profile
      await updateProfile(currentUser, {
        picture: downloadURL
      });
  
      // Assuming there's a users collection and documents are keyed by UID
      const userDocRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userDocRef, {
      picture: downloadURL
      });
  
      alert("Profile picture updated successfully!");
      // Consider using state to trigger re-render instead of reloading the page
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
          <Li><Link to="/admindashboard"><span style={{ marginLeft: '10px' }}>Painel de Controle</span></Link></Li>
          <Li><Link to="/admindashboard/projetos"><span style={{ marginLeft: '10px' }}>Projetos</span></Link></Li>
          <Li><Link to="/admindashboard/formularios"> <span style={{ marginLeft: '10px' }}>Formulários</span></Link></Li>
          <Li><Link to="/admindashboard/usuarios"><span style={{ marginLeft: '10px' }}>Úsuarios</span></Link></Li>
           
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Links>
        
      
      </LinksContainer>
    </Container>
  );
}
export default Sidebar;

const AvatarInput = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  width: 15%;
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
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  color: #e4e4e4;
  text-transform: uppercase;

  a {
    color: #e4e4e4;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  cursor: pointer;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #2ebc15;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #249a12;
  }
`;
