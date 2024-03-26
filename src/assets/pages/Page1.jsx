import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    background-position: center;
    background-size: cover;
    height: 100vh;
    margin-top: 400px;
    
    
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

const Page1= () => {
    return (
        <Container>
            <TextContainer>
            <H1>O que são Créditos de Carbono?</H1>
            <Paragraph>Os créditos de carbono são parte essencial do esforço global para combater as mudanças climáticas. Eles funcionam 
                    como instrumentos financeiros que representam a redução de emissões de gases de efeito estufa (GEE). Abaixo, 
                    detalhamos uma visão geral sobre os créditos de carbono, seu funcionamento e importância.
                    <Ul>
                        <li> Unidade de Medida: Um crédito de carbono equivale à redução de uma tonelada métrica de dióxido de 
carbono ou de um gás de efeito estufa equivalente.</li>
                        <li>Moeda Ambiental: Podem ser vistos como uma "moeda" que quantifica o esforço de redução ou remoção 
de emissões de gases de efeito estufa.</li>
                    </Ul>
                    
            </Paragraph>
            <H1>Como Funciona o Mercado de Créditos de Carbono?</H1>
            <Paragraph>
                <Ul>
                    <li>Geração de Créditos: Créditos são gerados por projetos que reduzem, evitam ou capturam emissões. 
                        Exemplos incluem reflorestamento, projetos de energia renovável, captura e armazenamento de carbono, 
                        entre outros.</li>
                                            <li>Comércio: O mercado permite que entidades que reduzem emissões além de suas obrigações vendam 
                        créditos de carbono para entidades que precisam ou desejam compensar suas emissões</li>
                                            <li>Regulação: O mercado é regulado por normas internacionais, como o Protocolo de Kyoto e o Acordo de 
                        Paris, e pode também estar sujeito a regulamentações nacionais ou regionais.</li>
                                            <li>Compliance e Voluntário: Existem dois tipos de mercados de créditos de carbono - o mercado regulado 
                        (compliance), para empresas e países que estão legalmente obrigados a reduzir emissões, e o mercado 
                        voluntário, para aqueles que desejam compensar suas emissões por iniciativa própria.</li>
                </Ul>
            </Paragraph>
            <H1>Por que os Créditos de Carbono são Importantes?</H1>
            <Ul>
                <li>Incentivo Econômico: Criam um incentivo financeiro para a redução das emissões, tornando mais lucrativo 
investir em tecnologias limpas e práticas sustentáveis</li>
                <li>Flexibilidade: Oferecem flexibilidade para empresas e países que enfrentam desafios na redução direta de 
suas emissõe</li>
                <li>Financiamento de Projetos Sustentáveis: Os recursos obtidos pela venda de créditos de carbono podem 
financiar projetos de sustentabilidade que, de outra forma, poderiam não ser viáveis.</li> 
            </Ul>
            <Ul>
                <li>Não Substituem Reduções Diretas: A compra de créditos de carbono não deve ser vista como substituta 
para a redução direta de emissões. Empresas e países devem priorizar a redução de sua própria pegada de 
carbono antes de recorrer à compensação</li>
                <li> Risco de Greenwashing: Há um risco de que a compra de créditos de carbono seja usada para melhorar a 
imagem de uma empresa sem esforços reais de sustentabilidade, o chamado "greenwashing".</li>
                <li>Integridade dos Projetos: A qualidade e a integridade dos projetos geradores de créditos de carbono são 
essenciais para assegurar que as reduções de emissões sejam reais, mensuráveis, permanentes e adicionais.</li>
            </Ul>
           
            <H1>Conclusões</H1>
            <Paragraph>Os créditos de carbono são ferramentas valiosas na luta contra as mudanças climáticas, oferecendo um meio para 
mobilizar recursos financeiros para a transição para uma economia de baixo carbono. Embora não sejam uma 
panaceia, eles são componentes importantes de uma estratégia multifacetada para alcançar as metas de redução de 
emissões globais e promover a sustentabilidade ambiental, econômica e socials</Paragraph>
</TextContainer>
        </Container>
        
    );
}
export default Page1;