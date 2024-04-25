import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust the path according to your project structure
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


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
  p {
    margin: 0;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
        }
  }
`;

const ProjectItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    max-height: 200px;
    max-width: 200px;
    object-fit: cover;
  }
  p {
    margin: 0;
    cursor: pointer;
    max-width: 33vw;
    word-break: break-word;
    &:hover {
      text-decoration: underline;
    }
  }
`;

  
const Project = ({
    project, isEditing, currentEditContent, handleContentChange, handleEditToggle, handleSaveChanges, handleImageUpload
}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0); // Initialize with the first tab active

    const handleTabClick = (index) => {
        // Set new active tab index
        setActiveTabIndex(index);
    };
    const getInputType = (fieldName) => {
        if (fieldName.toLowerCase().includes('text')) {
            return 'text';
        } else if (fieldName.toLowerCase().includes('Url')) {
      
            return 'image';
        } else if (fieldName.toLowerCase().endsWith('s')) { // Simple heuristic to guess array fields
            return 'array';
        }
        return 'default'; // Use ReactQuill for other cases
    };
    

    return (
      <ProjectList>
        <h2 onClick={() => handleEditToggle('project', project.id, null, 'name')}>{project.name}</h2>
        {Object.keys(project).filter(key => key !== 'tabContents' && key !== 'id' && key !== 'projectId').map((field) => {
          const inputType = getInputType(field);
          return (
            <div key={field}>
              <strong>{field.replace(/([A-Z])/g, ' $1').trim()}: </strong>
              {isEditing && currentEditContent.field === field ? (
                inputType === 'text' ? (
                  <ReactQuill 
                    value={project[field]}
                    onChange={(content) => handleContentChange(content, project.id, null, field)} // Ensure `contentId` is null if not applicable
                  />
                ) : inputType === 'image' ? (
                  <input 
                    type="file"
                    onChange={(e) => handleImageUpload(e, project.id, field)}
                  />
                ) : inputType === 'array' ? (
                  <ArrayEditor 
                    arrayData={project[field]}
                    onArrayChange={(newArray) => handleContentChange(newArray, project.id, null, field)} // Ensure `contentId` is null if not applicable
                  />
                ) : (
                  <input 
                    type={inputType}
                    value={project[field]}
                    onChange={(e) => handleContentChange(e.target.value, project.id, null, field)} // Ensure `contentId` is null if not applicable
                  />
                )
              ) : (
                <p onClick={() => handleEditToggle('project', project.id, null, field)}
                  dangerouslySetInnerHTML={{ __html: project[field] }}>
                </p>
              )}
            </div>
          );
        })}
        <Button onClick={() => handleSaveChanges(project.id)}>Save</Button>
        <Nav>
          {project.tabContents.map((tab, index) => (
            <NavItem key={tab.id}>
              <NavLink onClick={() => handleTabClick(index)} className={activeTabIndex === index ? 'active' : ''}>
                {tab.id}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        {/* Display the content of the active tab below the navigation bar */}
        {project.tabContents[activeTabIndex] && (	
          <div 
            key={project.tabContents[activeTabIndex].id}
            style={{ display: activeTabIndex  ? 'block' : 'none' }}
          >
            {Object.keys(project.tabContents[activeTabIndex]).filter(key => key !== 'id' && key !== 'projectId').map((field) => {
              const inputType = getInputType(field);
              return (
                <div key={field}>
                  <strong>{field.replace(/([A-Z])/g, ' $1').trim()}: </strong>
                  {isEditing && currentEditContent.field === field ? (
                    inputType === 'text' ? (
                      <ReactQuill
                        value={project.tabContents[activeTabIndex][field]}
                        onChange={(content) => handleContentChange(content, project.id, project.tabContents[activeTabIndex].id, field)}
                      />
                    ) : inputType === 'image' ? (
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, project.id, field)}
                      />
                    ) : inputType === 'array' ? (
                      <ArrayEditor
                        arrayData={project.tabContents[activeTabIndex][field]}
                        onArrayChange={(newArray) => handleContentChange(newArray, project.id, project.tabContents[activeTabIndex].id, field)}
                      />
                    ) : (
                      <input
                      type={inputType}
                      value={project.tabContents[activeTabIndex][field]}
                      onChange={(e) => handleContentChange(e.target.value, project.id, project.tabContents[activeTabIndex].id, field)}
                      />
                    )
                  ) : (
                    <p onClick={() => handleEditToggle('tabContent', project.id, project.tabContents[activeTabIndex].id, field)}>
                    {project.tabContents[activeTabIndex][field]}
                    </p>
                  )}
                  </div>
                );
              })}
              </div>
            )}
      </ProjectList>
    );
};
const ArrayEditor = ({ arrayData, onArrayChange }) => {
    const [items, setItems] = useState(arrayData || []);

    const handleAddItem = () => {
        setItems([...items, '']); // Add empty item
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleChangeItem = (value, index) => {
        const newItems = items.map((item, i) => i === index ? value : item);
        setItems(newItems);
    };

    useEffect(() => {
        onArrayChange(items);
    }, [items, onArrayChange]);

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => handleChangeItem(e.target.value, index)}
                    />
                    <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddItem}>Add Item</button>
        </div>
    );
};

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
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0 10px;
`;


const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState({ projectIndex: 0, tabIndex: 0 });
  const [loading, setLoading] = useState(true);
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
              projectId: docSnapshot.id
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

  const handleEditToggle = useCallback((type, projectId, contentId, field) => {
    setIsEditing(prev => !prev);
    setCurrentEditContent(prev => prev && prev.projectId === projectId && prev.contentId === contentId && prev.field === field ? null : { type, projectId, contentId, field });
  }, []);

  const handleContentChange = useCallback((content, projectId, contentId, field) => {
    console.log("handleContentChange called", {content, projectId, contentId, field});
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        // Check if the update is for tabContents
        if (contentId) {
          return {
            ...project,
            tabContents: project.tabContents.map(tab => tab.id === contentId ? { ...tab, [field]: content } : tab)
          };
        }
        // Else update the project's direct field
        return { ...project, [field]: content };
      }
      return project;
    }));
  }, []);
  

  const handleSaveChanges = useCallback(async () => {
    setTimeout(() => {
      console.log("handleContentChange called", {content, projectId, contentId, field});
    }, 15000);
    if (!currentEditContent) {
      console.error("No content selected for saving.");
      return;
    }
  
    const { type, projectId, contentId, field } = currentEditContent;
    const project = projects.find(p => p.id === projectId);
    const content = type === 'tabContent' ? project?.tabContents.find(c => c.id === contentId)?.[field] : project?.[field];
  
    if (!content) {
      console.error("No updated content available to save.");
      return;
    }
  
    const docRef = doc(db, type === 'tabContent' ? `projects/${projectId}/tabContents/${contentId}` : `projects/${projectId}`);
    try {
      await updateDoc(docRef, { [field]: content });
      console.log("Changes saved successfully.");
      setIsEditing(false);
      setCurrentEditContent(null);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  }, [currentEditContent, projects]);
  
  
  return (
    <Container>
      {/* Loading and error handling UI */}
      {loading && <p>Loading...</p>}
      {error && <p>Error loading projects: {error.message}</p>}
      {!loading && !error && projects.map((project, index) => (
        <Project
          key={project.id}
          project={project}
          activeTab={activeTab.projectIndex === index ? activeTab.tabIndex : 0}
          onTabClick={(tabIndex) => setActiveTab({ projectIndex: index, tabIndex })}
          isEditing={isEditing}
          
          currentEditContent={currentEditContent}
          handleContentChange={handleContentChange}
          handleEditToggle={handleEditToggle}
          handleSaveChanges={handleSaveChanges}
        />
      ))}
    </Container>
  );
};

export default Projetos;