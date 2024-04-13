import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firestore } from "../../config/firebase"; // Ensure this path is correct
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  margin: 0 24em;
  
    input, textarea{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    }
    textarea {
        min-height: 16rem;
    }
    select {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;                                                                             
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
`;

const ProjectItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
`;

function Projetos() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [editingId, setEditingId] = useState(null); // NEW: Track the currently edited project's ID
  const [editCategory, setEditCategory] = useState(""); // NEW: Category for editing
  const [editName, setEditName] = useState(""); // NEW: Name for editing
  const [editDescription, setEditDescription] = useState(""); // NEW: Description for editing

  const [projectTrechoTitle1, setProjectTrechoTitle1] = useState("");
  const [projectTrechoText1, setProjectTrechoText1] = useState("");
  const [editTrechoTitle1, setEditTrechoTitle1] = useState("");
  const [editTrechoText1, setEditTrechoText1] = useState("");

  function parseAndBoldText(text) {
    if (!text) {
      return ""; // Or return any placeholder text you prefer
    }
    // Split text by "**", assuming even indices are normal text, odd indices are bold
    const parts = text.split('**').map((part, index) => {
      if (index % 2 === 1) { // Odd indices are bold
        return <strong key={index}>{part}</strong>;
      } else {
        return part; // Normal text
      }
    });
  
    return parts;
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(firestore, "projects"));
      setProjects(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchProjects();
  }, []);
  const deleteProject = async (id) => {
    // Reference to the document in your Firestore collection
    const projectDocRef = doc(firestore, "projects", id);

    // Delete the document from Firestore
    await deleteDoc(projectDocRef);

    // Filter out the project from the local state
    setProjects(projects.filter(project => project.id !== id));
  };

  const addProject = async (e) => {
    e.preventDefault();
    if (!projectName || !projectDescription) return;

    const docRef = await addDoc(collection(firestore, "projects"), {
      name: projectName,
      description: projectDescription,
    });

    setProjects([...projects, { name: projectName, description: projectDescription, category: projectCategory,  id: docRef.id }]);
    setProjectName("");
    setProjectDescription("");
    setProjectCategory("");
    setProjectTrechoText1("");
    setProjectTrechoTitle1("");
  };

  // Adjusted update function
  const saveUpdate = async () => {
    if (!editName || !editDescription || !editingId) return;
  
    const projectDoc = doc(firestore, "projects", editingId);
    await updateDoc(projectDoc, {
      name: editName,
      description: editDescription,
      // Include updates for trechoTitle and trechoText
      trechoTitle1: editTrechoTitle1,
      trechoText1: editTrechoText1,
    });
  
    // Update local state
    setProjects(projects.map(project => project.id === editingId ? {
      ...project,
      name: editName,
      description: editDescription,
      trechoTitle1: editTrechoTitle1,
      trechoText1: editTrechoText1
    } : project));
    setEditingId(null); // Reset editing state
  };
  

  return (
    <Container>
      <h1>Projetos</h1>
      <ProjectForm onSubmit={addProject}>
        <div>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Nome do Projeto" />
        <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Descrição do projeto"></textarea>
        <select type="text" value={projectCategory} onChange={(e) => setProjectCategory(e.target.value)} placeholder="Categoria" >
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
            <option value="category4">Category 4</option>
        </select>
        </div>
        
        <h1  style={{ marginTop: '100px'}}> trecho 1 </h1>
        <div >
        <input type="text" value={projectTrechoTitle1} onChange={(e) => setProjectTrechoTitle1(e.target.value)} placeholder="Trecho 1 titulo" />
        <textarea value={projectTrechoText1} onChange={(e) => setProjectTrechoText1(e.target.value)} placeholder="Trecho 1 texto"></textarea>
        </div>
        <Button type="submit">Adicionar Projeto</Button>
      </ProjectForm>
      <ProjectList>
        {projects.map(project => (
          <ProjectItem key={project.id}>
            {editingId === project.id ? (
              <>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="New Name" />
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="New Description"></textarea>
                <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} placeholder="New Name" />
                <Button onClick={saveUpdate}>Save</Button>
              </>
            ) : (
              <>
              <div style={{ margin: '10em 0'}}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <h3>{project.category}</h3>
                <h3>{project.trechoTitle1}</h3>
                <p>{parseAndBoldText(project.trechoText1)}</p>
                <Button onClick={() => { setEditingId(project.id); setEditName(project.name); setEditDescription(project.description); }}>Edit</Button>
                <Button onClick={() => deleteProject(project.id)}>Delete</Button>
              </div>
             
              </>
            )}
          </ProjectItem>
        ))}
      </ProjectList>
    </Container>
  );
}

export default Projetos;
