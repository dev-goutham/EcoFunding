import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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

function Tabs({ avatarUrl, projects, progress, tabs, visibleTab, activeTab, handleTabClick, scrollTabs, sheetData }) {
  return (
    <Container>      
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
          {projects.map(project => (
            project.tabContents && Object.entries(project.tabContents).map(([key, content]) => (
              activeTab === key && (
                <div key={key}>
                  <H1>{content.Title1 || 'No Title'}</H1>
                  <P>{content.Text1 || 'No Description'}</P>
                  <P>{content.additionalInfo1 || 'No Additional Info'}</P>
                  {content.ImageURL && <img src={content.ImageURL} alt={`Image for ${content.Title1}`} />}
                  {/* Dynamic sheet data rendering based on tab */}
                  {Object.keys(sheetData).length > 0 ? (
                    Object.entries(sheetData).map(([dataKey, dataValue]) => (
                      <React.Fragment key={dataKey}>
                        <Table>
                          <thead>
                            <tr>
                              {dataValue.length > 0 && Object.keys(dataValue[0]).map(header => <Th key={header}>{header}</Th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {dataValue.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {Object.values(row).map((value, valueIndex) => <Td key={valueIndex}>{value}</Td>)}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </React.Fragment>
                    ))
                  ) : (
                    <p>Loading sheet data...</p>
                  )}
                </div>
              )
            ))
          ))}
        </Content>
      </SecondSetup>
    </Container>
  );
}
export default Tabs;