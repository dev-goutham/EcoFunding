
import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
function Dashboard() {
  return (
    <Container>
      <Sidebar />
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 150vh;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;

export default Dashboard;