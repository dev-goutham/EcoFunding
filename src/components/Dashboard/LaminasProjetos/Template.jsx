import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPiggyBank, FaDonate, FaPercentage, FaChartPie, FaQuestionCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import logo from '../../../assets/HomeSection1.webp';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
color: #007bff;
cursor: pointer;
padding: 10px;
display: block;
text-decoration: none;
&:hover {
  text-decoration: underline;
}
&.active {
  color: #fff;
  
}
`;

const Content = styled.div`
margin-top: 20px;
width: 90%;
height: auto;
padding: 20px;
border: 1px solid #dee2e6;
border-radius: 5px;
`;
const Arrow = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;


export default function Indicators() {
    const [progress, setProgress] = useState(50);
    const [activeTab, setActiveTab] = useState('operacao');
    const [content, setContent] = useState({ title: '', description: '', additionalInfo: '' });
    const [visibleTab, setVisibleTab] = useState(0);
    const tabs = ['operacao', 'empresa', 'empreendedor', 'remuneracao', 'juridico', 'informacoes-essenciais', 'investidores'];

    const db = getFirestore();
    const projectId = 'qntECkJNIaemYFBG0FJt'; // This should be dynamically assigned as needed

    useEffect(() => {
      const fetchContent = async () => {
        const docRef = doc(db, `projects/${projectId}/tabContents`, activeTab); // Updated path to include projectId
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            Title1: data.Title1 || 'No Title',
            Text1: data.Text1 || 'No description available.',
            additionalInfo1: data.additionalInfo1 || 'No additional information.'
          });
        } else {
          console.log("No such document!");
          setContent({ title: '', description: 'No content available for this tab.', additionalInfo: '' });
        }
      };

      fetchContent();
    }, [activeTab, db, projectId]); // Include projectId in dependency array

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const scrollTabs = (direction) => {
      setVisibleTab(prev => {
        const newValue = prev + direction;
        return (newValue >= 0 && newValue + 4 <= tabs.length) ? newValue : prev;
      });
    };

    // UI Rende
    return (
      <Container>
        <FirstSetup>
          <ImgFirstSetup src={logo} alt="logo" />
          <Column>
            <H1>Nome do projeto</H1>
            <P>Descrição do projeto</P>
  
            <IndicatorContainer>
              <Row>
                <Column>
                  <FaPiggyBank size={24} color="#666" />
                  <IndicatorText>
                    <IndicatorTitle>
                      Valor da Cota
                      <Button><FaQuestionCircle /></Button>
                    </IndicatorTitle>
                    <IndicatorDesc>R$ 3,500.00</IndicatorDesc>
                  </IndicatorText>
                </Column>
                <Column>
                  <FaDonate size={24} color="#666" />
                  <IndicatorText>
                    <IndicatorTitle>
                      Valor Captado
                      <Button><FaQuestionCircle /></Button>
                    </IndicatorTitle>
                    <IndicatorDesc>R$ 745,500.00</IndicatorDesc>
                  </IndicatorText>
                </Column>
              </Row>
              <Row>
                <Column>
                  <FaPercentage size={24} color="#666" />
                  <IndicatorText>
                    <IndicatorTitle>
                      Participação
                      <Button><FaQuestionCircle /></Button>
                    </IndicatorTitle>
                    <IndicatorDesc>0.0152% por cota</IndicatorDesc>
                  </IndicatorText>
                </Column>
                <Column>
                  <FaChartPie size={24} color="#666" />
                  <IndicatorText>
                    <IndicatorTitle>
                      Pagamentos Projetados
                      <Button><FaQuestionCircle /></Button>
                    </IndicatorTitle>
                    <IndicatorDesc>Anuais</IndicatorDesc>
                  </IndicatorText>
                </Column>
              </Row>
              <ProgressBar max="100" value={progress}></ProgressBar>
              <ProgressText>{progress}% Complete</ProgressText>
            </IndicatorContainer>
            <Button onClick={() => setProgress(progress + 10)}>Investir</Button>
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
          <Content>
            <H1>{content.Title1}</H1>
            <P>{content.Text1}</P>
            <P>{content.additionalInfo1}</P>

            <H1>{content.Title2} </H1>
          </Content>
        </SecondSetup>
      </Container>
    );
  }




{/*
<div>
  <div>
    <Arrow onClick={() => scrollTabs(-1)}><FaArrowLeft /></Arrow>
    <nav>
      {tabs.slice(visibleTab, visibleTab + 4).map(tab => (
        <li key={tab}>
          <a
            className={activeTab === tab ? 'active' : ''}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </a>
        </li>
      ))}
    </nav>
    <Arrow onClick={() => scrollTabs(1)}><FaArrowRight /></Arrow>
  </div>
  <div>
    <h1>{content}</h1>
    <p>{content}</p>
  </div>
</div>
</div>
);
};

export default Indicators;
*/}