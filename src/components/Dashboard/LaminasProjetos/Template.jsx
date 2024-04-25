import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Tabs from './Tabs';
import { useParams } from 'react-router-dom';
import { Height } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  border-radius: 8px;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

const IndicatorText = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndicatorTitle = styled.p`
  font-weight: bold;
  margin: 0;
`;

const IndicatorDesc = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
`;

const ProgressBar = styled.progress`
  width: 70%;
  height: 20px;
  color: #007bff;
  margin: 0 auto;
  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 10px;
  }
  &::-webkit-progress-value {
    background-color: #007bff;
    border-radius: 10px;
  }
  &::-moz-progress-bar {
    background-color: #007bff;
    border-radius: 10px;
  }
`;

const ProgressText = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  font-family: 'Lexend Tera', sans-serif;
  text-transform: uppercase;
`;

const P = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-family: 'Dm Sans', sans-serif;
`;

const FirstSetup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
`;

const ImgFirstSetup = styled.img`
  width: 400px;
  height: 400px;
`;

const SecondSetup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
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
&:hover {
  background-color: #f5f5f5;
  border-radius: 5px;
}
&.active {
  color: #000000;
  box-shadow: 0px 1.5px 0px #2ebc15;
  
}
`;

const Content = styled.div`
margin-top: 20px;
width: 90%;
height: auto;
min-height: 400px;
padding: 20px;
border: 1px solid #dee2e6;
border-radius: 5px;
img {
  width: 100%;
  height: auto;
}
`;
const Arrow = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  color: #333;
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 48%;  // Allows for 2 columns
  height: 200px;  // Fixed height, adjust as necessary
  margin-bottom: 20px;  // Space between rows
`;


const CustomProgressBar = styled.progress`
  width: 100%;
  height: 20px;
  color: #007bff;  // Used for the value color
  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 10px;
  }
  &::-webkit-progress-value {
    background-color: #007bff;
    border-radius: 10px;
  }
  &::-moz-progress-bar {
    background-color: #007bff;
    border-radius: 10px;
  }
`;
const Embed = styled.iframe`
  height: auto !important;      // Adjusts height automatically to the content
  width: 90%;     // Allows the iframe to grow to fill the remaining space
  margin: 0;
  padding: 0 !important;
  border: none;      // Removes border to integrate seamlessly
  display: block;
  
`;

export default function Indicators() {
  const {projectid} = useParams();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('operacao');
  const [visibleTab, setVisibleTab] = useState(0);
  const [sheetData, setSheetData] = useState({});
  const [selectedProject, setSelectedProject] = useState('PainelSolarTeste')
  const [progress, setProgress] = useState(50);  // Example progress state
  const db = getFirestore();
  const [content, setContent] = useState({
    Title1: '',
    Text1: '',
    AdditionalInfo1: '',
    ImageUrl1: '',
    Title2: '',
    Text2: '',
    AdditionalInfo2: '',
    ImageUrl2: '',
    Title3: '',
    Text3: '',
    AdditionalInfo3: '',
    ImageUrl3: ''

});
  console.log('imageUrl:', project?.tabContents?.ImageUrl);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, "projects", projectid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProject(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
  
    fetchProject();
  }, [projectid]);
  
  useEffect(() => {
    const fetchProject = async () => {
      if(!projectid || !activeTab) {
        console.error('Project ID or active tab not defined')
      }

      const parentDocRef = doc(db, 'projects', projectid);  // Ensure projectId is defined
      const subCollectionRef = collection(parentDocRef, 'tabContents');
      const specificDocRef = doc(subCollectionRef, activeTab);  // Ensure activeTab is a valid document ID
      try {
      const specificDocSnapshot = await getDoc(specificDocRef);
      if (specificDocSnapshot.exists()) {
        console.log(specificDocSnapshot.id, " => ", specificDocSnapshot.data());
        setSheetData(specificDocSnapshot.data())
        
      } else {
        console.log('No such document!');
         
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  
    fetchProject();
  }, [projectid, activeTab]);  // Ensure dependencies are correctly listed
  
  

 

  useEffect(() => {
    if (project) {
      const subCollectionRef = collection(db, `projects/${projectid}/tabContents`);
      const specificDocRef = doc(subCollectionRef, activeTab);
      
      const fetchTabData = async () => {
        const docSnap = await getDoc(specificDocRef);
        if (docSnap.exists()) {
          setSheetData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      };

      fetchTabData();
    }
  }, [projectid, activeTab, project, db]);
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = [];
  
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const project = {
          ...data,
          id: doc.id,
          texts: [],
          icons: [],
          tabContents: {}
        };
  
        // Fetch subcollection for tabContents
        const tabContentsSnapshot = await getDocs(collection(db, `projects/${doc.id}/tabContents`));
        tabContentsSnapshot.docs.forEach(subDoc => {
          project.tabContents[subDoc.id] = subDoc.data();
        });
  
        // Dynamically read text and icon fields based on a naming convention
        let index = 1;
        while (data[`MainText${index}`]) {
          project.texts.push(data[`MainText${index}`]);
          project.icons.push(data[`MainTextIcon${index}`]);
          index++;
        }
  
        projectsData.push(project);
      }
  
      setProjects(projectsData);
      setTabs(Array.from(new Set(projectsData.flatMap(project => Object.keys(project.tabContents)))));
    };
  
    fetchProjects();
  }, [db]);  // Ensuring this only runs when `db` changes
  useEffect(() => {
    const fetchTabData = async () => {
        if (!activeTab || projects.length === 0) return;
        const activeProject = projects.find(p => p.id === projectid);
        if (activeProject) {
            const tabContent = activeProject.tabContents[activeTab];
            const newContent = {};
            Object.keys(content).forEach(key => {
                if (tabContent[key]) {
                    newContent[key] = tabContent[key].toString();
                    console.log(`${key}:`, newContent[key]);
                }
            });
            setContent(newContent);
        }
    };

    fetchTabData();
}, [activeTab, projects, projectid]);
  
 

  useEffect(() => {
    const fetchSheetData = async () => {
      if (!activeTab || projects.length === 0) return;

      const project = projects.find(p => p.tabContents && p.tabContents[activeTab]);
      if (project) {
        const tabContent = project.tabContents[activeTab];
        Object.entries(tabContent).forEach(async ([key, url]) => {
          if (key.startsWith('sheetData') && url && !(key in sheetData)) {
            try {
              const response = await axios.get(url);
              const data = parseCSV(response.data);
              setSheetData(prev => ({ ...prev, [key]: data }));
            } catch (error) {
              console.error('Error fetching Google Sheet:', error);
            }
          }
        });
      }
    };
    fetchSheetData();
  }, [activeTab, projects]);
  
  
 

  function parseCSV(csvText) {
    // Split the text into an array of lines
    const lines = csvText.split(/\r?\n/);
    // Extract headers by splitting the first line by comma
    const headers = lines[0].split(',');

    // Map the rest of the lines into objects
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        // Create an object for each row
        const rowObject = headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
        return rowObject;
    });

    return data;
}
  
 

  
    

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollTabs = (direction) => {
    setVisibleTab(prev => {
      const newValue = prev + direction;
      return (newValue >= 0 && newValue < tabs.length) ? newValue : prev;
    });
  };
  
  const data  = [
    {icon:project?.icon1,text:project?.text1},
    {icon:project?.icon2,text:project?.text2},
    {icon:project?.icon3,text:project?.text3},
   ]
  return (
    <Container>
      <FirstSetup>
        <ImgFirstSetup src={"https://placehold.co/600"} alt="logo" />
        <Column>
            <Grid>
            {data.map((item, index) => (
              <GridItem key={index}>
                  <img src={item.icon} alt="logo" />
                  <div dangerouslySetInnerHTML={{ __html:  item.text }} />
              </GridItem>
            ))}
            </Grid>

          <Button onClick={() => console.log('Invest action')}>Investir</Button>
          <CustomProgressBar value={progress} max="100">Loading...</CustomProgressBar>
        </Column>
      </FirstSetup>
      <SecondSetup>
      <Row>
          <Arrow onClick={() => scrollTabs(-1)}><FaArrowLeft /></Arrow>
          <Nav>
            {tabs.slice(visibleTab, visibleTab + 4).map(tab => (
              <NavItem key={tab}>
                <NavLink
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <Arrow onClick={() => scrollTabs(1)}><FaArrowRight /></Arrow>
        </Row>
        
        <H1>{content.Title1}</H1>
        <P>{content.Text1}</P>
        <P>{content.AdditionalInfo1}</P>
        <img src={content.ImageUrl1} alt="logo" />
        <H1>{content?.Title2}</H1>
        <P>{content?.Text2}</P>
        <P>{content?.AdditionalInfo2}</P>
        <img src={content?.ImageUrl2} />
        <H1>{content?.Title3}</H1>
        <P>{content?.Text3}</P>
        <P>{content?.AdditionalInfo3}</P>
        <img src={content?.ImageUrl3} />

       
    
      </SecondSetup>
    </Container>
  );
}