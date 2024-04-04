import FormBoxLogin from '../../components/AdminLogin/FormBox.jsx';


import { Container, LearnCode, Wrapper, ContentWrapper } from '../../components/Login/style/App.styled.js'

function App() {
  return (
    <Container>
      {/* Learn Code Content */}
      <LearnCode>
        <ContentWrapper>
          <h1>
            Faça login acessar os formulários
          </h1>
        
        </ContentWrapper>
      </LearnCode>

      {/* Form Wrapper*/}
      <Wrapper>
        
        <FormBoxLogin />
      </Wrapper>
    </Container>
  );
}

export default App;
