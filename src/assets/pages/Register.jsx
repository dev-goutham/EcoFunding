import FormBoxRegister from '../../components/Register/FormBox.jsx';


import { Container, LearnCode, Wrapper, ContentWrapper } from '../../components/Login/style/App.styled.js'

function App() {
  return (
    <Container>
      {/* Learn Code Content */}
      <LearnCode>
        <ContentWrapper>
          <h1>
            Conheça o painel de controle Eco
          </h1>
          <p>
          Veja informações sobre seu investimento sustentável e acompanhe seus ganhos em tempo real.
          </p>
        </ContentWrapper>
      </LearnCode>

      {/* Form Wrapper*/}
      <Wrapper>
    
        <FormBoxRegister />
      </Wrapper>
    </Container>
  );
}

export default App;
