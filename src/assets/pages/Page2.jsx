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
`;
const Img = styled.img`
    
`;
const Ul = styled.ul`
       text-align: start;
`;

const Page2= () => {
    return (
        <Container>
            <TextContainer>
            <H1>Sustentabilidade: Um Compromisso com o Futuro</H1>
            <Paragraph>Sustentabilidade é um conceito fundamental na era atual, refletindo a necessidade de desenvolvermos práticas e
políticas que garantam a saúde e a viabilidade do nosso planeta para as gerações futuras. Trata-se de um equilíbrio
entre crescimento econômico, cuidado com o meio ambiente e bem-estar social, formando os pilares essenciais para
uma sociedade mais justa e um mundo mais habitável.

            </Paragraph>
            <H1>No Âmbito Ambiental:</H1>
            <Paragraph>
                <Ul>
                    <li> Preservação dos recursos naturais</li>
                    <li> Minimização de impactos negativos sobre os ecossistemas</li>
                    <li> Ações como redução da emissão de gases do efeito estufa.</li>
                    <li> Proteção da biodiversidade.</li>
                    <li> Gestão sustentável da água e dos solos.</li>
                    <li> Promoção da agricultura e energia renovável.</li>
                </Ul>
            </Paragraph>
            <H1>Do Ponto de Vista Social:</H1>
            <Ul>
                <li>Melhoria da qualidade de vida para todas as pessoas.</li>
                <li>Acesso igualitário a recursos básicos, educação de qualidade e saúde.</li>
                <li>Promoção da igualdade de gênero.</li>
                <li>Empoderamento de comunidades marginalizadas.</li>
            </Ul>
            <H1>No Aspecto Econômico: </H1>
            <Ul>
            <li>Adoção de modelos de negócios que gerem crescimento sustentável.</li>
  <li>Promoção de práticas éticas e responsáveis.</li>
  <li>Inclusão de transparência, governança corporativa e responsabilidade social.</li>
            </Ul>
            
            <H1>Integração dos Três Pilares</H1>
            <Paragraph>A integração desses três pilares é vital para alcançar um desenvolvimento sustentável.
Isso requer uma mudança de paradigma nas formas como vivemos, consumimos e produzimos, movendo-nos em
direção a um sistema que valorize:

</Paragraph>
<Ul>
    <li>Regeneração dos recursos naturais</li>
    <li>Inclusão social.</li>
    <li>Economia circular.</li>
</Ul>
<H1>Promoção da Sustentabilidade</H1>
<Paragraph>Promover a sustentabilidade é um compromisso coletivo que envolve:</Paragraph>
<Ul>
  <li>Governos.</li>
  <li>Empresas.</li>
  <li>Comunidades.</li>
  <li>Indivíduos.</li>
</Ul>
<Paragraph>Através de pequenas ações diárias, como:</Paragraph>
<Ul>
  <li>Reduzir o consumo de plástico.</li>
  <li>Reciclar.</li>
  <li>Utilizar meios de transporte mais limpos.</li>
  <li>Apoiar empresas sustentáveis.</li>
</Ul>
</TextContainer>
        </Container>
        
    );
}
export default Page2;