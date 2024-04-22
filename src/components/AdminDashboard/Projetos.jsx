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
const TabContent = ({ tab, isEditing, currentEditContent, onEditToggle, onSave, onContentChange }) => {
    return (
        <ProjectItem>
            <h3>{tab.id} Tab</h3>
            {Object.keys(tab).map((field) => (
                <div key={field}>
                    {isEditing && currentEditContent.contentId === tab.id && currentEditContent.field === field ? (
                        <ReactQuill value={tab[field]} onChange={(content) => onContentChange(content, tab.id, field)} />
                    ) : (
                        <p onClick={() => onEditToggle(tab.projectId, tab.id, field)}>{tab[field]}</p>
                    )}
                </div>
            ))}
            <Button onClick={onSave}>Save</Button>
        </ProjectItem>
    );
};
  
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
        } else if (fieldName.toLowerCase().includes('avatarUrl')) {
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
                            onChange={(content) => handleContentChange(content, project.id, field)}
                        />
                    ) : inputType === 'image' ? (
                        <input 
                            type="file"
                            onChange={(e) => handleImageUpload(e, project.id, field)}
                        />
                    ) : inputType === 'array' ? (
                        <ArrayEditor 
                            arrayData={project[field]}
                            onArrayChange={(newArray) => handleContentChange(newArray, project.id, field)}
                        />
                    ) : (
                        <ReactQuill 
                            value={project[field]}
                            onChange={(content) => handleContentChange(content, project.id, field)}
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
    <TabContent
        tab={project.tabContents[activeTabIndex]}
        isEditing={isEditing}
        currentEditContent={currentEditContent}
        onEditToggle={handleEditToggle}
        onSave={handleSaveChanges}
        onContentChange={handleContentChange}
    />
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
  const [activeTab, setActiveTab] = useState(0);
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
  const handleImageUpload = async (event, projectId, field) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = db.storage().ref();
    const fileRef = storageRef.child(`images/${projectId}/${field}/${file.name}`);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();

    // Save the URL to Firestore
    handleContentChange(fileUrl, projectId, field);
};

  const handleEditToggle = useCallback((type, projectId, contentId, field) => {
    const isCurrent = currentEditContent && currentEditContent.projectId === projectId && currentEditContent.contentId === contentId && currentEditContent.field === field;
    if (isEditing && isCurrent) {
      setIsEditing(false);
      setCurrentEditContent(null);
    } else {
      setIsEditing(true);
      setCurrentEditContent({ type, projectId, contentId, field });
    }
  }, [isEditing, currentEditContent]);
  
  
  const handleContentChange = useCallback((content, id, field) => {
    if (currentEditContent && id === currentEditContent.contentId && field === currentEditContent.field) {
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === currentEditContent.projectId ? {
            ...project,
            tabContents: project.tabContents.map(tab =>
              tab.id === id ? { ...tab, [field]: content } : tab
            )
          } : project
        )
      );
    }
  }, [currentEditContent, projects]);

  
  const handleSaveChanges = useCallback(async () => {
    console.log("Save Changes Function Triggered");
    if (!currentEditContent) {
        console.error("No content selected for saving.");
        return;
    }

    const { type, projectId, contentId, field } = currentEditContent;

    if (type === 'project') {
        // Save changes to project
        try {
            const projectDocRef = doc(db, `projects/${projectId}`);
            await updateDoc(projectDocRef, { [field]: projects.find(p => p.id === projectId)[field] });
            setIsEditing(false);
            setCurrentEditContent(null);
            console.log("Project changes saved.");
        } catch (error) {
            console.error("Failed to save project changes:", error);
        }
    } else if (type === 'tabContent') {
        // Save changes to tabContents
        try {
            const tabDocRef = doc(db, `projects/${projectId}/tabContents/${contentId}`);
            await updateDoc(tabDocRef, { [field]: projects.find(p => p.id === projectId).tabContents.find(c => c.id === contentId)[field] });
            setIsEditing(false);
            setCurrentEditContent(null);
            console.log("Tab content changes saved.");
        } catch (error) {
            console.error("Failed to save tab content changes:", error);
        }
    } else {
        console.error("Invalid content type:", type);
    }
}, [currentEditContent, projects]);




  
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
      handleImageUpload={handleImageUpload}
      currentEditContent={currentEditContent}
      handleContentChange={handleContentChange}
      handleEditToggle={handleEditToggle}  // Make sure this is correctly passed
      handleSaveChanges={handleSaveChanges}
/>

    
  </React.Fragment>
))}

      {/* Content - Only show tab contents for the currently ACTIVE project */}
      
      
    </Container>
  );
};

export default Projetos;
