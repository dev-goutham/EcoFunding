import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoStatsChart } from "react-icons/io5";
import { useAuth } from "../../config/AuthContext"; // Adjust path as necessary
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { hoverEffect } from "../../utils"; // Ensure utils path is correct

function Earnings() {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [earningsIncrease, setEarningsIncrease] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      const db = getFirestore();
      const projectsQuery = query(collection(db, "projects"), where("userIds", "array-contains", currentUser.uid));

      try {
        const querySnapshot = await getDocs(projectsQuery);
        const projectsData = querySnapshot.docs.map(doc => doc.data());

        if (projectsData.length === 0) {
          // If there are no projects, do not proceed further
          return;
        }

        // Calculate total earnings and earnings increase
        const total = projectsData.reduce((sum, project) => sum + project.earnings, 0);
        const increase = projectsData.reduce((sum, project) => sum + (project.earningsIncrease || 0), 0) / projectsData.length;

        setTotalEarnings(total);
        setEarningsIncrease(increase);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [currentUser]);

  // Return null if there are no projects, hence no earnings to display
  if (totalEarnings === 0 && earningsIncrease === 0) {
    return null; // or you could return a custom message/component indicating there are no projects/earnings
  }

  return (
    <EarningsCard>
      <CardContent>
        <Chart>
          <IoStatsChart />
        </Chart>
        <EarningsText>Ganhos</EarningsText>
        <Earning>${totalEarnings.toFixed(2)}</Earning>
        <EarningsIncrease>+ {earningsIncrease.toFixed(2)}% desde o último mês</EarningsIncrease>
      </CardContent>
    </EarningsCard>
  );
}


const EarningsCard = styled.div`
  height: 100%;
  width: 14rem;
  background-color: #2c3e50;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 4rem;
    width: 4rem;
  }
`;

const EarningsText = styled.h3`
  text-align: center;
  font-weight: normal;
  padding: 0.4rem 0;
`;

const Earning = styled.h2`
  text-align: center;
`;

const EarningsIncrease = styled.h5`
  text-align: center;
  font-weight: normal;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 2rem;
`;

export default Earnings;
