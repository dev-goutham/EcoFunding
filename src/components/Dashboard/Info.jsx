import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../config/AuthContext"; // Adjust path as necessary
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { cardShadow, hoverEffect } from "../../utils"; // Ensure utils path is correct

function Info() {
  const [projectCount, setProjectCount] = useState(0);
  const [projectsThisMonth, setProjectsThisMonth] = useState(0);
  const [rank, setRank] = useState("Calculating..."); 
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      const db = getFirestore();
      const projectsQuery = query(collection(db, "projects"), where("userIds", "array-contains", currentUser.uid));

      try {
        const querySnapshot = await getDocs(projectsQuery);
        const projectsData = querySnapshot.docs.map(doc => doc.data());

        // Update state based on fetched data
        const projectsCount = projectsData.length;
        setProjectCount(projectsCount);

        // If no projects, you may not need to proceed with further calculations
        if (projectsCount === 0) {
          setRank("N/A"); // Update rank to indicate no projects, or adjust as needed
          return; // Early return to avoid unnecessary calculations
        }

        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const projectsThisMonthCount = projectsData.filter(project => {
          const projectDate = new Date(project.createdAt); // Assuming there's a 'createdAt' field
          return projectDate >= startOfMonth;
        }).length;

        setProjectsThisMonth(projectsThisMonthCount);

        // Set rank based on projects data
        setRank(calculateRank(projectsData)); 
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [currentUser]);

  function calculateRank(projectsData) {
    // Implement your ranking logic here
    return projectsData.length > 5 ? 1 : projectsData.length; // Dummy logic
  }

  // If no projects are associated with the user, return null or an optional message
  if (projectCount === 0) {
    return null; // Or return a custom component/message indicating no projects are available
  }

  
  return (
    <InfoCard>
    <Card>
      <CardContent>
        <Row>
          <Digit>{rank}</Digit>
          <InfoContainer>
            <Title>Ranking</Title>
            <SubTitle>Baseado na quantidade de projetos investidos</SubTitle>
          </InfoContainer>
        </Row>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Row>
          <Digit>{projectCount}</Digit>
          <InfoContainer>
            <Title>Projects</Title>
            <SubTitle>{projectsThisMonth} this month</SubTitle>
          </InfoContainer>
        </Row>
      </CardContent>
    </Card>
  </InfoCard>
);
}





const InfoCard = styled.div`
  height: 100%;
  width: 14rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  color: white;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
  }
`;

const Card = styled.div`
  background-color: rgba(183, 194, 243, 0.3);
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  padding: 0.7rem 1rem 0.3rem 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  ${({ justify }) =>
    justify &&
    `
      justify-content:space-around;
      width:90%
  `}
`;
const Digit = styled.div`
  background-color: #2ebc15;
  padding: 0.8rem 1rem;
  font-size: 1.3rem;
  border-radius: 1rem;
`;
const InfoContainer = styled.div`
  margin-left: 0.7rem;
`;
const Title = styled.h3`
  color: black;
  font-family: "Lexend Tera", sans-serif;
`;
const SubTitle = styled.h5`
  color: #333333;
  font-weight: normal;
`;

export default Info;
