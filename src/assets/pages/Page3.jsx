import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    background-position: center;
    background-size: cover;
    
    
    
    
`;
const TextContainer = styled.div`
    width: 60vw;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
const H1 = styled.h1`
     width: 100%;
     font-family: "Lexend Tera", sans-serif;
     text-transform: uppercase;
`;
const Paragraph = styled.p`
    text-align: start;
    font-family: "Dm Sans", sans-serif;
    
`;
const Img = styled.img`
    
`;
const Ul = styled.ul`
       text-align: start;
       font-family: "Dm Sans", sans-serif;
`;

const Page3= () => {
    return (
        <Container>
            <TextContainer>
            <H1>Responsabilidade Ambiental: Um Compromisso Com o Futuro do Planeta</H1>
            <Paragraph>A responsabilidade ambiental é um princípio essencial para a preservação do nosso planeta, exigindo a
conscientização e ação de indivíduos, empresas e governos na promoção de um futuro mais sustentável. Este
conceito abrange a obrigação de minimizar o impacto negativo das atividades humanas no meio ambiente,
assegurando a conservação dos recursos naturais para as presentes e futuras gerações.
<H1>Empresas e Sustentabilidade:</H1>

                    <Ul>
                    <li>Incentivo à adoção de práticas de produção mais limpas.</li>
  <li>Investimento em tecnologias verdes.</li>
  <li>Redução da emissão de poluentes.</li>
  <li>Gestão sustentável dos recursos.</li>
                    </Ul>
                    <Paragraph>Essas ações contribuem não apenas para a saúde ambiental, mas também fortalecem a imagem corporativa e
fomentam a inovação.</Paragraph>
                    
            </Paragraph>
            
  <H1>GOVERNOS E POLÍTICAS PÚBLICAS</H1>
    <Ul>
      <li>Implementação de políticas públicas e regUlamentações ambientais.</li>
      <li>Leis de reciclagem obrigatória.</li>
      <li>Incentivos para energias renováveis.</li>
      <li>Restrições à desflorestação e proteção de áreas naturais vUlneráveis.</li>
    </Ul>

  <H1>RESPONSABILIDADE INDIVIDUAL</H1>  
    <Ul>
      <li>Redução do consumo de água e energia.</li>
      <li>Escolha de produtos sustentáveis.</li>
      <li>Reciclagem.</li>
      <li>Diminuição da pegada de carbono pessoal.</li>
    </Ul>
  
  <H1>EDUCAÇÃO AMBIENTAL</H1>
    <Ul>
      <li>Fomento de uma consciência ecológica desde cedo.</li>
      <li>Preparação das novas gerações para enfrentarem os desafios ambientais.</li>
    </Ul>
  
  <H1>INICIATIVAS DE CONSERVAÇÃO E RESTAURAÇÃO ECOLÓGICA</H1>
    <Ul>
      <li>Engajamento em plantio de árvores.</li>
      <li>Limpeza de rios e praias.</li>
      <li>Restauração de habitats.</li>
    </Ul>
    <Paragraph>A responsabilidade ambiental é, portanto, um compromisso compartilhado que transcende fronteiras e culturas,
exigindo uma colaboração global para garantir a sustentabilidade do nosso planeta. Através da adoção de práticas
responsáveis, podemos construir uma sociedade que valoriza e protege os recursos naturais, assegurando um legado
de prosperidade e saúde ambiental para as futuras gerações.</Paragraph>
  


</TextContainer>
        </Container>
        
    );
}
export default Page3;