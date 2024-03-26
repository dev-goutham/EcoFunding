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

const Page4= () => {
    return (
        <Container>
            <TextContainer>
                <H1>Entendendo a Pegada de Carbono: Impacto e Gestão</H1>
                <Paragraph>
                    A pegada de carbono é uma métrica essencial para entender e gerenciar o impacto ambiental das atividades
                    humanas, especialmente no contexto corporativo. Ela representa a totalidade de gases de efeito estufa (GEEs)
                    emitidos direta ou indiretamente por uma empresa ou atividade. Estes gases incluem, mas não se limitam a, dióxido
                    de carbono (CO2), metano (CH4), óxido nitroso (N2O), vapor d'água (H2O) e ozônio (O3).
                    <br />
                    A relevância da pegada de carbono se dá principalmente por sua associação direta com o aquecimento global e as
                    mudanças climáticas. As emissões de GEEs contribuem para o efeito estufa, que aumenta a temperatura média do
                    planeta, causando consequências como o derretimento de calotas polares, alterações climáticas severas e
                    fenômenos meteorológicos extremos.
                </Paragraph>
                <Paragraph>
                    Empresas responsáveis buscam medir e reduzir sua pegada de carbono através de estratégias como a otimização de
                    processos, uso de matérias-primas sustentáveis, escolha de fontes de energia renováveis, gestão eficiente de
                    resíduos e adoção de práticas de logística verde. Este esforço não só melhora a qualidade de vida da comunidade e
                    preserva o meio ambiente local, mas também contribui para a luta global contra as mudanças climáticas.
                </Paragraph>
                <Paragraph>
                    Ao comunicar sobre pegada de carbono em seu site, é importante destacar a relevância dessa métrica, os métodos
                    para sua medição e as estratégias para sua redução. Este conteúdo deve ser apresentado de forma educativa e
                    motivacional, encorajando a ação e o comprometimento dos leitores com práticas sustentáveis.
                </Paragraph>
                <Paragraph>
                    Reconhecendo a importância deste tema, comprometemo-nos a medir, gerenciar e comunicar nossa pegada de
                    carbono de maneira transparente. Através da inovação e adoção de práticas sustentáveis, trabalhamos não apenas
                    para minimizar nosso impacto ambiental, mas também para liderar pelo exemplo e inspirar a ação coletiva.
                </Paragraph>
            </TextContainer>
        </Container>
        
    );
}
export default Page4;