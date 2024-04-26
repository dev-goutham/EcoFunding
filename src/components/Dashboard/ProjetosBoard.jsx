
import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import ProjetosInvestidos from "./ProjetosInvestidos.jsx";
function ProjetosBoard() {
  return (
    <Container>
      <Sidebar />
      <ProjetosInvestidos />
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

export default ProjetosBoard;