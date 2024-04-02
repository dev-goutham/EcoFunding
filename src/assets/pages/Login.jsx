import FormBoxLogin from '../../components/Login/FormBox.jsx';
import FormBoxlogin from '../../components/Login/FormBox.jsx';

import { Container, LearnCode, Wrapper, ContentWrapper } from '../../components/Login/style/App.styled.js'

function App() {
  return (
    <Container>
      {/* Learn Code Content */}
      <LearnCode>
        <ContentWrapper>
          <h1>
            Faça login acessar o dashboard
          </h1>
          <p>
          Veja informações sobre seu investimento sustentável e acompanhe seus ganhos em tempo real.
          </p>
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
