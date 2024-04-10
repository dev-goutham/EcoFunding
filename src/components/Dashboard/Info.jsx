import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../config/AuthContext";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { cardShadow, hoverEffect } from "../../utils";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Info() {
  const { currentUser } = useAuth();
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const investmentTypeColors = {
    Reflorestamento: 'rgb(255, 99, 133)',
    PainelSolar: 'rgb(54, 163, 235)',
    Biogas: 'rgb(255, 207, 86)',
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      const db = getFirestore();
      const projectsQuery = query(collection(db, "projects"), where("userIds", "array-contains", currentUser.uid));

      try {
        const querySnapshot = await getDocs(projectsQuery);
        const projectsData = querySnapshot.docs.map(doc => doc.data());
        const categoryCounts = projectsData.reduce((acc, project) => {
          const category = project.category || 'Other';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        const categories = Object.keys(categoryCounts);
        const counts = categories.map(category => categoryCounts[category]);
        const backgroundColors = categories.map(category => investmentTypeColors[category] || 'rgba(201, 203, 207, 0.2)');
        const borderColors = categories.map(category => investmentTypeColors[category].replace('0.2', '1') || 'rgba(201, 203, 207, 1)');

        setChartData({
          labels: categories,
          datasets: [{
            label: 'Project Categories',
            data: counts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          }],
        });

        setChartOptions({
          animation: {
            animateScale: true,
          },
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [currentUser]);

  return (
    <InfoCard>
      <Card>
        <CardContent>
          <Pie data={chartData} options={chartOptions} />
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
