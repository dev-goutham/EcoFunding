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

const Page4= () => {
    return (
        <Container>
            <TextContainer>
                <H1>Energia Renovável: Sustentabilidade e Inovação</H1>
                <Paragraph>
                    A energia renovável é o pilar central para uma transição energética sustentável e para o combate às mudanças
                    climáticas. Diferente dos combustíveis fósseis, as fontes renováveis, como solar, eólica, hidráulica e geotérmica,
                    fornecem energia limpa, reduzindo as emissões de gases de efeito estufa. A mudança para energias renováveis não
                    só beneficia o meio ambiente, mas também impulsiona a economia, diminuindo custos de energia a longo prazo e
                    criando novas oportunidades de emprego.
                </Paragraph>
                <Paragraph>
                    Com a tecnologia avançando rapidamente, o custo de implementação das energias renováveis tem diminuído,
                    tornando-as mais acessíveis para consumidores e empresas. Parques eólicos e instalações solares estão se tornando
                    cada vez mais comuns, com a capacidade de gerar eletricidade sem poluição. O desenvolvimento de sistemas de
                    armazenamento de energia está facilitando o uso contínuo de energia limpa, mesmo quando as condições naturais
                    não são favoráveis.
                </Paragraph>
                <Paragraph>
                    Para garantir o crescimento contínuo do setor de energia renovável, políticas governamentais de incentivo são
                    essenciais. Subsídios, financiamentos e metas claras de energia limpa são medidas que ajudam a estabelecer a
                    infraestrutura necessária para um futuro sustentável. Além de proteger o meio ambiente, a energia renovável
                    promove segurança energética e contribui para a independência de fontes não renováveis e muitas vezes instáveis.
                </Paragraph>
            </TextContainer>
        </Container>
        
    );
}
export default Page4;