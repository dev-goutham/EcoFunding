import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FaLongArrowAltRight } from 'react-icons/fa';
// Assuming these styled components were defined in FirstStep or a separate file
// StyledForm, StyledInput, StyledButton
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  gap: 20px;
  align-items: center;
  margin-bottom: 5%;
  margin-top: 10%;
  font-family: 'Dm Sans';
  @media (max-width: 768px) {
    flex-direction: column;
    }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  width: 24rem;
  @media (max-width: 768px) {
    width: 200px;
    }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledButton = styled.button`
  padding: 10px 85px;
  background-color: #2ebc15;
  color: white;
  border: none;
  width: 20rem;
  cursor: pointer;

  &:hover {
    background-color: #249a12;
  }
  @media (max-width: 768px) {
    width: 200px;
    }
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const SecondStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      cnpj: '', // Ensure cnpj has a default value
      emailCorporativo: ''
    }
  });
 


  const cnpjValue = watch("cnpj"); // Watch the CNPJ input value

  // Function to format the CNPJ value
  const formatCNPJ = (value) => {
    const cnpjNum = value.replace(/\D/g, ''); // Remove all non-digit characters
    return cnpjNum.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  // Effect to reformat the CNPJ input value when it changes
  useEffect(() => {
    setValue("cnpj", formatCNPJ(cnpjValue));
  }, [cnpjValue, setValue]);

  const onSubmit = data => {
    updateFormData(data);
    nextStep();
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledButton type="button" onClick={prevStep}>Voltar</StyledButton>
      {formData.role === "Parceiro" ? (
        <>
          <Column>
          <StyledInput type="text" placeholder="CNPJ/CPF" {...register("cnpjCpf", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.cnpjCpf && "CNPJ/CPF inválido"}</span>
        
          
          <StyledInput type="text" placeholder="Empresa" {...register("empresa", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.empresa && "Preencha este campo"}</span>
          
          <StyledInput type="email" placeholder="Email" {...register("email",  { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.email && "Preencha este campo"}</span>
          
          <StyledInput type="text" placeholder="Segmento" {...register("segmento", { required: true, })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.segmento && "Preencha este campo"}</span>
         
          <StyledInput type="text" placeholder="Nome do representante" {...register("nomeRepresentante", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.nomeRepresentante && "Preencha este campo"}</span>
     
          <StyledInput type="text" placeholder="Cargo" {...register("cargo", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.cargo && "Preencha este campo"}</span>
          
          <StyledInput type="text" placeholder="Cidade" {...register("cidade", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.cidade && "Preencha este campo"}</span>
         
          <StyledInput type="text" placeholder="Estado" {...register("estado", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.estado && "Preencha este campo"}</span>
          </Column>
        </>
      ) : (
        <>
        <Column>
        <StyledInput type="text" placeholder="CNPJ" {...register("cnpj", { required: true, pattern: /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/ })} />
        <span style={{ fontSize: 12, color: 'red' }}>{errors.cnpj && "CNPJ inválido"}</span>
        
          <StyledInput type="email" placeholder="E-mail corporativo" {...register("emailCorporativo", { required: true, pattern: /^\S+@\S+$/i })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.emailCorporativo && "E-mail inválido"}</span>
         
          <StyledInput type="text" placeholder="Nome da empresa" {...register("nomeEmpresa", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.nomeEmpresa && "Preencha este campo"}</span>
          
          <StyledInput type="text" placeholder="Cargo" {...register("cargoInvestidor", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.cargoInvestidor && "Preencha este campo"}</span>

          <StyledInput type="text" placeholder="Nome do representante" {...register("nomeDoRepresentante", { required: true })} />
          <span style={{ fontSize: 12, color: 'red' }}>{errors.nomeDoRepresentante && "Preencha este campo"}</span>

          </Column>
        </>
      )}
      
      
      <StyledButton type="submit">
          <FaLongArrowAltRight color="white" size="24" />
      </StyledButton>

    </StyledForm>
  );
};

export default SecondStep;