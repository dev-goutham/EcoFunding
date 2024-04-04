import React, { useState } from 'react';
import styled from 'styled-components';
import FirstStep from './Etapa0'; // Adjust the import path as needed
import SecondStep from './Etapa1'; // Adjust the import path as needed
import ThirdStep from './Etapa2'; // Adjust the import path as needed

const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;

const StepBall = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.isActive ? '#2ebc15' : '#ccc'};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 16px;
`;

const H1 = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Lexend Tera';
`;

export default function FormContainer({ id }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    role: '',
    cnpjCpf: '',
    empresa: '',
    email: '',
    segmento: '',
    nomeRepresentante: '',
    cargo: '',
    cidade: '',
    estado: '',
    cnpj: '',
    emailCorporativo: '',
    nomeEmpresa: '',
    cargoInvestidor: '',
    nomeDoRepresentante: '',
    
  });

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  // Function to update form data
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Determine the title based on the selected role
  const getTitle = () => {
    switch (formData.role) {
      case 'Parceiro':
        return 'Parceiro';
      case 'Investidor':
        return 'Investidor';
      default:
        return 'Formulário';
    }
  };

  return (
    <>
      <StepperContainer id={id}>
        <H1>{getTitle()}</H1> {/* Dynamically set the title */}
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
          {[1, 2, 3].map((step) => (
            <StepBall key={step} isActive={currentStep === step}>
              {step}
            </StepBall>
          ))}
        </div>
      </StepperContainer>
      {currentStep === 1 && <FirstStep nextStep={nextStep} updateFormData={updateFormData} />}
      {currentStep === 2 && <SecondStep nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
      {currentStep === 3 && <ThirdStep formData={formData} prevStep={prevStep} />}
    </>
  );
}
