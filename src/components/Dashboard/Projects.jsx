import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardShadow, hoverEffect } from "../../utils";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from "../../config/AuthContext"; // Make sure the path is correct

function Projects() {
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const { currentUser } = useAuth(); // Assuming useAuth provides the current user

  useEffect(() => {
    if (!currentUser) return; // Exit if currentUser is not available

    const db = getFirestore();
    const projectsQuery = query(collection(db, "projects"), where("userIds", "array-contains", currentUser.uid));

    getDocs(projectsQuery).then((querySnapshot) => {
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData); // Set the fetched projects in the state
    }).catch(error => console.error("Error fetching projects:", error));
  }, [currentUser]);

  // Only render the YourProjects component if there are projects to display
  if (projects.length === 0) {
    return null; // or you could return a message indicating there are no projects
  }

  return (
    <YourProjects>
      <Title> SEUS PROJETOS </Title>
      {projects.map(project => (
        <Project key={project.id}>
          <Avatar>
            <img src={project.avatarUrl || "path/to/default/avatar.png"} alt="" />
          </Avatar>
          <Detail>
            <Title>{project.title}</Title>
            <SubTitle>{project.subtitle}</SubTitle>
          </Detail>
        </Project>
      ))}
      <AllProjects>Veja todos os projetos</AllProjects>
    </YourProjects>
  );
}

// Styled components remain the same...

const YourProjects = styled.div`
  height: 87.5%;
  background-color: white;
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    width: 80%;
    margin-top: 1rem;
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;
const Avatar = styled.div`
  img {
    height: 4rem;
    width: 4rem;
    border-radius: 4rem;
  }
`;
const Detail = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  font-family: "Lexend Tera", sans-serif;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`;
const SubTitle = styled.h5`
  font-weight: 300;
  font-family: "Dm Sans", sans-serif;
`;
const AllProjects = styled.h5`
  text-align: end;
  color: darkblue;
  cursor: pointer;
`;

export default Projects;
