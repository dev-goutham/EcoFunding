import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the gap as needed */
  height: auto;
  margin-bottom: 5%;
  align-items: center;
  margin-top: 10%;
  font-family: 'Dm Sans';
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 24rem;
  border: 1px solid #ccc;
  @media (max-width: 768px) {
    width: 200px;
    }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const RoleButton = styled.button`
  padding: 10px;
  width: 24rem;
  border: 2px solid ${props => props.isSelected ? '#242a32' : '#ccc'};
  background-color: ${props => props.isSelected ? '#242a32' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  
  &:hover {
    background-color: #242a32;
    color: white;
  }
  @media (max-width: 768px) {
    width: 200px;
    }
`;

const StyledButton = styled.button`
  padding: 10px 50px;
  background-color: #2ebc15;
  color: white;
  border: none;
  width: 24rem;
  cursor: pointer;

  &:hover {
    background-color: #249a12;
  }
  @media (max-width: 768px) {
    width: 200px;
    }
`;

const MobileInput = ({ onChange, value }) => {
  return (
    <StyledInput
      type="tel"
      placeholder="Telefone (XX) XXXXX-XXXX"
      value={value}
      onChange={onChange}
    />
  );
};

const FirstStep = ({ nextStep, updateFormData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleMobileInputChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setMobileNumber(formattedPhoneNumber);
    setValue('mobileNumber', formattedPhoneNumber, { shouldValidate: true });
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setValue('role', role, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    updateFormData({ ...data, role: selectedRole });
    nextStep();
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput type="text" placeholder="Nome" {...register("firstName", { required: true, maxLength: 80 })} />
      <span style={{ fontSize: 12, color: 'red' }}>{errors.firstName && "Preencha este campo"}</span>
      <StyledInput type="text" placeholder="Sobrenome" {...register("lastName", { required: true, maxLength: 100 })} />
      <span style={{ fontSize: 12, color: 'red' }}>{errors.lastName && "Preencha este campo"}</span>
      <MobileInput value={mobileNumber} onChange={(e) => handleMobileInputChange(e)} />
      <span style={{ fontSize: 12, color: 'red' }}>{errors.mobileNumber && "Preencha este campo"}</span>
      
      <StyledLabel>
        <RoleButton isSelected={selectedRole === 'Parceiro'} onClick={() => handleRoleSelection('Parceiro')}>
          Parceiro
        </RoleButton>
        <RoleButton isSelected={selectedRole === 'Investidor'} onClick={() => handleRoleSelection('Investidor')}>
          Investidor
        </RoleButton>
      </StyledLabel>
      <StyledButton type="submit">Próxima etapa</StyledButton>
    </StyledForm>
  );
};

export default FirstStep;
