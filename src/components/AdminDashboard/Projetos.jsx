import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { firestore } from "../../config/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Bar } from 'react-chartjs-2';
import ImageField from "./ImageField";
import Papa from 'papaparse';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
  margin: 0 auto;
  input, textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    min-height: 24em;
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
  width: 80%;
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

const Nav = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled.a`
  color: #5e5e5e;
  cursor: pointer;
  padding: 10px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  &.active {
    color: #000000;
    box-shadow: 0px 1.5px 0px #2ebc15;
  }
`;

const Arrow = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

function Projetos() {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [visibleTab, setVisibleTab] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [csvData, setCsvData] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null); // New state for tracking selected project

  useEffect(() => {
    fetchProjects();
  }, []);

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
    setSelectedProjectId(projectsData[0]?.id);
    const uniqueTabs = new Set(projectsData.flatMap(p => Object.keys(p.tabContents || {})));
    setTabs([...uniqueTabs]);
    if (uniqueTabs.size > 0) setActiveTab([...uniqueTabs][0]);
  };
const selectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };
  const fetchDataFromCsvUrl = async (url, key) => {
    try {
      const response = await fetch(url);
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setCsvData(prevData => ({
            ...prevData,
            [key]: results.data
          }));
        }
      });
    } catch (error) {
      console.error("Error fetching or parsing CSV:", error);
    }
  };

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const scrollTabs = useCallback((direction) => {
    setVisibleTab(prev => {
      const newValue = prev + direction;
      return (newValue >= 0 && newValue < tabs.length) ? newValue : prev;
    });
  }, [tabs.length]);

  const deleteProject = useCallback(async (projectId) => {
    await deleteDoc(doc(firestore, "projects", projectId));
    setProjects(currentProjects => currentProjects.filter(project => project.id !== projectId));
  }, []);

  const handleEditChange = useCallback((field, value) => {
    setEditProject(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTabContentChange = useCallback((tab, field, value) => {
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
  }, []);

  const saveUpdate = useCallback(async () => {
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
    setEditProject(null);
  }, [editProject]);

  return (
    <Container>
      <h1>Projetos</h1>
      {editProject && (
        <ProjectForm onSubmit={(e) => e.preventDefault()}>
          {Object.entries(editProject).map(([key, value]) => (
            <div key={key}>
              <label>{key}</label>
              {typeof value === 'string' && value.length > 50 ? (
                <textarea value={value} onChange={(e) => handleEditChange(key, e.target.value)} />
              ) : (
                <input type="text" value={value} onChange={(e) => handleEditChange(key, e.target.value)} />
              )}
            </div>
          ))}
          {editProject.tabContents && Object.entries(editProject.tabContents).map(([tabKey, content]) => (
            <div key={tabKey}>
              <h5>Tab {tabKey}</h5>
              {Object.entries(content).map(([fieldKey, fieldValue]) => {
                let element = null;
                switch (true) {
                  case fieldKey.toLowerCase().includes('imageUrl'):
                    element = (
                      <ImageField key={fieldKey} label={fieldKey} imageUrl={fieldValue}
                        onImageUpload={(newUrl) => handleTabContentChange(tabKey, fieldKey, newUrl)}
                        storagePath={`tabContents/${editProject.id}/${tabKey}`} />
                    );
                    break;
                  case typeof fieldValue === 'string' && fieldValue.length > 50:
                    element = (
                      <textarea key={fieldKey} value={fieldValue} onChange={(e) => handleTabContentChange(tabKey, fieldKey, e.target.value)} />
                    );
                    break;
                  case fieldKey.toLowerCase().includes('sheetData'):
                    element = (
                      <Bar key={fieldKey} data={JSON.parse(fieldValue)} options={{ scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} />
                    );
                    break;
                  default:
                    element = (
                      <input key={fieldKey} type="text" value={fieldValue} onChange={(e) => handleTabContentChange(tabKey, fieldKey, e.target.value)} />
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
      <Nav>
        <Arrow onClick={() => scrollTabs(-1)}><FaArrowLeft /></Arrow>
        {tabs.slice(visibleTab, visibleTab + 4).map(tab => (
          <NavItem key={tab}>
            <NavLink className={activeTab === tab ? 'active' : ''} onClick={() => handleTabClick(tab)}>{tab}</NavLink>
          </NavItem>
        ))}
        <Arrow onClick={() => scrollTabs(1)}><FaArrowRight /></Arrow>
      </Nav>
      <ProjectList>
      {projects.map(project => {
          if (project.id === selectedProjectId) {
            return (
              <ProjectItem key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.tabContents && project.tabContents[activeTab] && (
                  <div>
                    <h4>{project.tabContents[activeTab].Title1 || 'No Title'}</h4>
                    <p>{project.tabContents[activeTab].Text1 || 'No Description'}</p>
                    {project.tabContents[activeTab].ImageURL && (
                      <img src={project.tabContents[activeTab].ImageURL} alt={`Image for ${project.tabContents[activeTab].Title1}`} />
                    )}
                  </div>
                )}
                <Button onClick={() => selectProject(project.id)}>View</Button>
                <Button onClick={() => deleteProject(project.id)}>Delete</Button>
              </ProjectItem>
            );
          }
          return null;
        })}
      </ProjectList>
    </Container>
  );
}
export default Projetos;