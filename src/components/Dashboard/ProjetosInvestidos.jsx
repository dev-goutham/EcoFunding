import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firestore } from "../../config/firebase"; // Make sure this path is correct
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../config/AuthContext"; // Adjust path as necessary
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  h1 {
    font-size: 24px;
    font-weight: bold;
    font-family: "Lexend Tera", sans-serif;

  }
  p {
    font-size: 16px;
    font-family: "Dm Sans", sans-serif;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2ebc15;
    color: white;
    cursor: pointer;
    flex-grow: 1;
    width: 100%;
  
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Project = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

function ProjetosInvestidos() {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useAuth();  // Retrieve current user from Auth context

  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      const projectsCollection = collection(firestore, "projects");
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(project => project.userIds && project.userIds.includes(currentUser.uid)); // Filter projects by current user ID
      setProjects(projectsList);
    };
    fetchProjects();
  }, [currentUser]);

  if (!projects.length) {
    return (
      <Container>
        <h1>No Projects Assigned</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Projetos Investidos</h1>
      <ProjectList>
        {projects.map((project) => (
          <Project key={project.id}>
            <img src={project.avatarUrl} alt={project.name} />
            <div>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <p>Modalidade: {project.category}</p>
              <p>Valor Investido: R$ {project.investment}</p>
              <p>Retorno: R$ {project.earnings} em creditos ambientais</p>
              <Link to={`/projetos/${project.id}`}><button > Saiba Mais </button></Link>

              

            </div>
          </Project>
        ))}
      </ProjectList>
    </Container>
  );
}

export default ProjetosInvestidos;
