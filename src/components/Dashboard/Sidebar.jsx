
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
    const storageReference = storageRef(storage, `user_images/${currentUser.uid}/${selectedFile.name}`);
    uploadBytes(storageReference, selectedFile)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        updateProfile(currentUser, {
          photoURL: downloadURL
        }).then(() => {
          alert("Profile picture updated successfully!");
          window.location.reload();
          // Update UI or state as necessary to reflect the new profile picture
        }).catch((error) => {
          console.error("Error updating profile picture:", error);
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
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
          <Link>Inicio</Link>
          <Link>Projetos</Link>
          <Link>a</Link>
          <Link>a</Link>
          
        </Links>
        
      </LinksContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      
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
