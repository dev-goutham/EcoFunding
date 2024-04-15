import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { firestore } from "../../config/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Bar } from 'react-chartjs-2';
import ImageField  from "./ImageField";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 20px;
  margin: 0 auto;
  h1 {
    font-size: 2rem;        
    text-transform: uppercase;
  }
`;

const ProjectForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 30rem;
  margin: 0 auto; /* Centered the form in the page */
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    min-height: 24em; /* Adjust as needed */
    height: 100%; /* Adjust as needed */
    box-sizing: border-box;
  }
  h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2ebc15;
    color: white;
    cursor: pointer;
    width: 100%;
  
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%; /* Set a max width for better layout control */
`;

const ProjectItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    max-height: 200px;
    max-width: 200px;
    object-fit: cover;
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #2ebc15;
  color: white;
`;

function Projetos() {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Project Data',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(firestore, "projects"));
      const projectsData = await Promise.all(querySnapshot.docs.map(async doc => {
        const project = { ...doc.data(), id: doc.id };
        const tabContentsSnapshot = await getDocs(collection(firestore, `projects/${doc.id}/tabContents`));
        project.tabContents = tabContentsSnapshot.docs.reduce((acc, doc) => ({
          ...acc,
          [doc.id]: doc.data()
        }), {});
        return project;
      }));
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);
  const deleteProject = useCallback(async (projectId) => {
    const projectDocRef = doc(firestore, "projects", projectId);
    try {
      await deleteDoc(projectDocRef);
      setProjects(currentProjects => currentProjects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }, []);

  const handleEditChange = (field, value) => {
    setEditProject(prev => ({ ...prev, [field]: value }));
  };

  const handleTabContentChange = (tab, field, value) => {
    setEditProject(prev => ({
      ...prev,
      tabContents: {
        ...prev.tabContents,
        [tab]: {
          ...prev.tabContents[tab],
          [field]: value
        }
      }
    }));
  };
  const updateChartData = (projects) => {
    const labels = projects.map(p => p.name);
    const data = projects.map(p => p.value);  // Ensure 'value' is a numeric field in Firestore

    setChartData({
      labels,
      datasets: [{
        label: 'Project Values',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    });
  };
  const saveUpdate = async () => {
    if (!editProject) return;

    const projectDocRef = doc(firestore, "projects", editProject.id);
    await updateDoc(projectDocRef, {
      name: editProject.name,
      description: editProject.description,
      category: editProject.category,
    });

    Object.entries(editProject.tabContents).forEach(async ([key, value]) => {
      const tabContentDocRef = doc(firestore, `projects/${editProject.id}/tabContents`, key);
      await updateDoc(tabContentDocRef, value);
    });

    setProjects(prevProjects => prevProjects.map(project => project.id === editProject.id ? { ...project, ...editProject } : project));
    setEditProject(null); // Exit edit mode
  };

  return (
    <Container>
      <h1>Projetos</h1>
      {editProject && (
    <ProjectForm onSubmit={(e) => e.preventDefault()}>
      {Object.entries(editProject).map(([key, value]) => {
        if (key !== "tabContents") {
          const isTextArea = typeof value === 'string' && value.length > 50;
          return (
            <div key={key}>
              <label>{key}</label>
              {isTextArea ? (
                <textarea
                  value={value}
                  onChange={(e) => handleEditChange(key, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleEditChange(key, e.target.value)}
                />
              )}
            </div>
          );
        }
        return null;
      })}

      {/* Handling nested tabContents with a switch-case structure */}
      {editProject.tabContents && Object.entries(editProject.tabContents).map(([tabKey, content]) => (
        <div key={tabKey}>
          <h5>Tab {tabKey}</h5>
          {Object.entries(content).map(([fieldKey, fieldValue]) => {
            let element = null;
            switch (true) {
              case fieldKey.toLowerCase().includes('imageUrl'):
                element = (
                  <ImageField
                    key={fieldKey}
                    label={fieldKey}
                    imageUrl={fieldValue}
                    onImageUpload={(newUrl) => handleTabContentChange(tabKey, fieldKey, newUrl)}
                    storagePath={`tabContents/${editProject.id}/${tabKey}`}
                  />
                );
                break;
              case typeof fieldValue === 'string' && fieldValue.length > 50:
                element = (
                  <div key={fieldKey}>
                    <label>{fieldKey}</label>
                    <textarea
                      value={fieldValue}
                      onChange={(e) => handleTabContentChange(tabKey, fieldKey, e.target.value)}
                    />
                  </div>
                );
                break;
              case fieldKey.toLowerCase().includes('chartdata'):
                element = (
                <div key={fieldKey}>
                <Bar
                  data={JSON.parse(fieldValue)}
                  options={{ scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }}
                />

            </div>
          );
          break;

              default:
                element = (
                  <div key={fieldKey}>
                    <label>{fieldKey}</label>
                    <input
                      type="text"
                      value={fieldValue}
                      onChange={(e) => handleTabContentChange(tabKey, fieldKey, e.target.value)}
                    />
                  </div>
                );
                break;
            }
            return element;
          })}
  </div>
))}


    <Button onClick={saveUpdate}>Save Changes</Button>
  </ProjectForm>
)}


      <ProjectList>
        {projects.map(project => (
          <ProjectItem key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <h3>{project.category}</h3>
            <div>
              <h4>Tab Contents:</h4>
              {Object.entries(project.tabContents || {}).map(([key, content]) => (
                <div key={key}>
                  <h5>Tab {key}</h5>
                  <p>{content.Title1 || 'No Title'}</p>
                  <p>{content.Text1 || 'No Description'}</p>
                  <p>{content.additionalInfo1 || 'No Additional Info'}</p>
                  {content.ImageURL && <img src={content.ImageURL} alt={`Image for ${content.Title1}`} />}
                  <p>{content.Title2 || 'No Title'}</p>
                  <p>{content.Text2 || 'No Description'}</p>
                  <p>{content.additionalInfo2 || 'No Additional Info'}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setEditProject({ ...project })}>Edit</Button>
            <Button onClick={() => deleteProject(project.id)}>Delete</Button>
          </ProjectItem>
        ))}
      </ProjectList>
    </Container>
  );
}


export default Projetos;


