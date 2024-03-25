import React from "react";
import styled from "styled-components";

// Styled section
const Section = styled.section`
  width: 100%;
  min-height: 80%;
  padding: 5rem 1rem; // Reduced and made responsive
  background-color: #3f4c5c;
  color: white;
  text-align: center;
  box-sizing: border-box; // Ensures padding is included in the width calculation
`;

// Adjusted Container for better centering and responsiveness
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; // Center children horizontally
  max-width: 1300px; // Maximum width to match other elements
  width: 100%; // Ensure it takes up available space
  padding: 0;
  
  

  @media (min-width: 768px) {
    padding: 4rem 2rem; // Adjust padding for larger screens
  }
`;

// Paragraph without modifications, assuming it's responsive enough
const Paragraph = styled.p`
  font-family: "Dm Sans", sans-serif;
`;

// FAQTitle with responsive font size
const FAQTitle = styled.h2`
  margin-bottom: 4rem; // Adjusted margin
  text-align: start;
  text-align: center; // Center text on larger screens
  font-size: 2em; // Made font size responsive
  font-weight: 600;
  line-height: 1.2; // Adjusted line-height for better readability
  text-transform: uppercase;
  @media (min-width: 640px) {
    font-size: 2.25rem; // Increase font size on larger screens
    text-align: center; // Center text on larger screens
    
  }
`;

// Styled FAQItems for better padding control and responsiveness
const FAQItems = styled.div`
  width: 100%; // Ensure it doesn't exceed the container width
  display: flex;
  flex-direction: column;
  


  @media (min-width: 640px) {
    padding: 0 1rem; // Adjust padding based on screen size
  }

  @media (min-width: 1024px) {
    padding: 0 2rem; // Increase padding for larger screens
  }

  @media (min-width: 1280px) {
    padding: 0 4rem; // Further increase padding for very large screens
  }
`;

// FAQDetail with minor adjustments for responsiveness
const FAQDetail = styled.details`
  width: 100%; // Ensure it fits within its parent container
  margin-bottom: 0.75em; // Adjust margin for better spacing
  
  summary {
    padding: 0.5rem 0;
    outline: none;
    cursor: pointer;
    text-transform: uppercase;
    
    &:focus {
      text-decoration: underline;
    }
  }

  & > div {
    padding: 0 0.5rem 0.5rem; // Adjust padding for the content
  }
`;
const FAQ = ({ id }) => {
  return (
    <Section id={id}>
      <Container className="container">
        <FAQTitle>Perguntas frequentes </FAQTitle>
        <FAQItems className="flex flex-col divide-y divide-gray-700">
          <FAQDetail>
            <summary>Como sei que meu investimento ajuda o meio ambiente?</summary>
            <div>
              <Paragraph>Relatórios de Impacto: Acompanhe o impacto positivo do seu investimento com relatórios detalhados.</Paragraph>
              <Paragraph>Certificações: Projetos certificados por órgãos renomados garantem sua confiabilidade.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Como posso saber o retorno do meu investimento ao meio ambiente?</summary>
            <div>
              <Paragraph>Créditos Ambientais: Receba créditos que representam a quantia de CO2 que você ajudou a reduzir.</Paragraph>
              <Paragraph>Relatórios de Impacto: Acompanhe os resultados tangíveis do projeto em termos de sustentabilidade.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Como a Ecofunding avalia e seleciona projetos para investimento?</summary>
            <div>
              <Paragraph>Critérios rigorosos: Análise de viabilidade, impacto ambiental e social, equipe qualificada e histórico do proponente.</Paragraph>
              <Paragraph>Comitê de especialistas: Seleção criteriosa dos projetos com maior potencial de impacto positivo.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Qual a garantia de que meu investimento me retornará créditos ambientais?</summary>
            <div>
              <Paragraph>Projetos certificados: Apenas projetos com certificações de órgãos renomados garantem a geração de créditos.</Paragraph>
              <Paragraph>Processo rigoroso: Rigorosa avaliação e acompanhamento garantem a entrega dos créditos.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Como posso monitorar o progresso e o impacto do meu investimento?</summary>
            <div>
              <Paragraph>Plataforma online: Acompanhe o andamento do projeto, resultados e impacto ambiental em tempo real.</Paragraph>
              <Paragraph>Relatórios periódicos: Receba relatórios detalhados com fotos, vídeos e indicadores de performance.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Como submeter meu projeto à Ecofunding para financiamento?</summary>
            <div>
              <Paragraph>Plataforma online: Acesse o site da Ecofunding e preencha o formulário de inscrição.</Paragraph>
              <Paragraph>Orientações: Siga as instruções e forneça todas as informações e documentações necessárias.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Quais critérios a Ecofunding utiliza para avaliar projetos?</summary>
            <div>
              <Paragraph>Viabilidade: Potencial de sucesso do projeto e capacidade de gerar impacto positivo.</Paragraph>
              <Paragraph>Impacto Ambiental: Redução de CO2, preservação da natureza, desenvolvimento sustentável.</Paragraph>
              <Paragraph>Impacto Social: Benefícios para a comunidade e geração de renda.</Paragraph>
              <Paragraph>Equipe qualificada: Experiência e capacidade para executar o projeto com sucesso.</Paragraph>
              <Paragraph>Histórico do proponente: Confiança e credibilidade do proponente.</Paragraph>
            </div>
          </FAQDetail>
          <FAQDetail>
            <summary>Como a Ecofunding apoia os projetos além do financiamento?</summary>
            <div>
              <Paragraph>Mentoria: Assessoria especializada para aprimorar o projeto e aumentar suas chances de sucesso.</Paragraph>
              <Paragraph>Divulgação: Ampla divulgação do projeto em diversos canais de comunicação.</Paragraph>
              <Paragraph>Conexões: Networking com outros parceiros e investidores.</Paragraph>
            </div>
          </FAQDetail>
        </FAQItems>
      </Container>
    </Section>
  );
};

export default FAQ;
