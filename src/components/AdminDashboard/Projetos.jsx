import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust the path according to your project structure
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the Quill CSS
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
  height: auto;
`;

const ProjectItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 20rem;
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
const TabContent = ({ tab, isEditing, currentEditContent, onEditToggle, onSave, onContentChange }) => {
  return (
    <ProjectItem>
      <h3>{tab.id} Aba</h3>
      {isEditing && currentEditContent.contentId === tab.id ? (
        <ReactQuill value={tab.Text1} onChange={onContentChange} />
      ) : (
        <p>{tab.description}</p>
      )}
      <Button onClick={() => onEditToggle(tab.projectId, tab.id)}>Edit</Button> 
      {isEditing && currentEditContent.contentId === tab.id && (
        <Button onClick={onSave}>Save</Button>
      )}
    </ProjectItem>
  );
}

const Project = ({ project, activeTab, onTabClick, isEditing, currentEditContent, handleContentChange, handleEditToggle, handleSaveChanges }) => {
  // Determine if the current project is being edited
  const isProjectEditing = isEditing && currentEditContent.type === 'project' && currentEditContent.projectId === project.id;

  return (
    <ProjectList>
      <h2 onClick={() => handleEditToggle('project', project.id)}>{project.name}</h2>
      {/* Toggle between ReactQuill and plain text display based on edit state */}
      {isProjectEditing ? (
        <ReactQuill value={project.MainText1} onChange={(content) => handleContentChange(content, project.id)} />
      ) : (
        <p onClick={() => handleEditToggle('project', project.id)}>{project.MainText1}</p>
      )}
      {/* Button to toggle edit/save state */}
      <Button onClick={() => isProjectEditing ? handleSaveChanges(project.id) : handleEditToggle('project', project.id)}>
        {isProjectEditing ? 'Save' : 'Edit Project'}
      </Button>
      <Nav>
        {project.tabContents.map((tab, index) => (
          <NavItem key={tab.id}>
            <NavLink 
              onClick={() => onTabClick(index)} 
              className={activeTab === index ? 'active' : ''}
            >
              {tab.id}
            </NavLink>
           
          </NavItem>
        ))}
      </Nav>
    </ProjectList>
  );
};


const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditContent, setCurrentEditContent] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsData = await Promise.all(projectsSnapshot.docs.map(async (docSnapshot) => {
          const tabContentsSnapshot = await getDocs(collection(db, `projects/${docSnapshot.id}/tabContents`));
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
            tabContents: tabContentsSnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
              projectId: docSnapshot.id  // Ensuring this is set correctly
            }))
          };
        }));
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError(error);
        setLoading(false);
      }
    };
    

    fetchProjects();
  }, []);

  const handleEditToggle = (type, projectId, contentId = null) => {
    const isCurrent = currentEditContent && currentEditContent.projectId === projectId && currentEditContent.contentId === contentId;
    if (isEditing && isCurrent) {
      setIsEditing(false);
      setCurrentEditContent(null);
    } else {
      setIsEditing(true);
      setCurrentEditContent({ type, projectId, contentId });
    }
  };
  
  const handleContentChange = (content, projectId) => {
    if (!currentEditContent || projectId !== currentEditContent.projectId) return;
  
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, MainText1: content }
          : project
      )
    );
  };
  
  const handleSaveChanges = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
  
    const docRef = doc(db, 'projects', projectId);
    updateDoc(docRef, { MainText1: project.MainText1 })
      .then(() => {
        setIsEditing(false);
        setCurrentEditContent(null);
      })
      .catch(console.error);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setContentToEdit(null); 
  };
// When setting active tabs, ensure the logic matches how you store and retrieve these indices
const handleTabClick = (projectIndex, tabIndex) => {
  setActiveTab({ projectIndex, tabIndex });
}

  const saveChanges = async () => {
    if (!currentEditContent) {
      console.error("No content selected for saving.");
      return;
    }

    try {
      const { projectId, contentId } = currentEditContent;
      const tabDocRef = doc(db, `projects/${currentEditContent.projectId}/tabContents/${currentEditContent.contentId}`);
      await updateDoc(tabDocRef, { description: projects.find(p => p.id === projectId).tabContents.find(c => c.id === contentId).description });
      setIsEditing(false);
      setCurrentEditContent(null);
      console.log("Changes saved.");
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
 };
 
  return (
    <Container> 
      {/* ... Loading and error states */}
      {!loading && !error && projects.map((project, projectIndex) => (
  <React.Fragment key={project.id}> {/* Use React.Fragment with key for top-level list */}
   <Project 
      key={project.id} 
      project={project}
      activeTab={activeTab?.projectIndex === projectIndex ? activeTab.tabIndex : 0}
      onTabClick={(tabIndex) => handleTabClick(projectIndex, tabIndex)}
      isEditing={isEditing}
      currentEditContent={currentEditContent}
      handleContentChange={handleContentChange}
      handleEditToggle={handleEditToggle}  // Make sure this is correctly passed
      handleSaveChanges={handleSaveChanges}
/>

    
  </React.Fragment>
))}

      {/* Content - Only show tab contents for the currently ACTIVE project */}
      {activeTab && projects[activeTab.projectIndex] && projects[activeTab.projectIndex].tabContents.map((tab, index) => (
  <React.Fragment key={tab.id}>
    <TabContent
      tab={tab}
      isEditing={isEditing}
      currentEditContent={currentEditContent}
      onEditToggle={(projectId, contentId) => handleEditToggle(projectId, contentId)}
      onSave={saveChanges}
      onContentChange={handleContentChange}
    />
    <Button onClick={() => {
      console.log('Edit button clicked for tab:', tab.id, 'in project:', tab.projectId);
      handleEditToggle(tab.projectId, tab.id); // Ensure correct projectId and contentId
    }}>Edit</Button>
  </React.Fragment>
))}
      
    </Container>
  );
};

export default Projetos;
