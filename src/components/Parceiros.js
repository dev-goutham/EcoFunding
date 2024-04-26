import React from 'react';
import { useState } from 'react';
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton } from '@coreui/react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  
  background-position: center;
  background-size: cover;
  height: 100vh;
`;
const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  
  background-position: center;
  background-size: cover;
  height: 70vh;
`;
const StyledCForm = styled(CForm)`
width: 80%;
margin: 0 auto;

`;
const StyledLabel = styled.label`
  margin-top: 1em;
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;
const Button = styled.button`
  margin-top: 2em;
  background: transparent;
  border: 2px solid #2ebc15;
  color: #2ebc15;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem 2rem;
  &:hover {
    background: #2ebc15;
    color: white;
    border: 2px solid white;
  }
  `;
const StyledForm = styled.form`
background-color: #f4f4f4;
padding: 20px;
border-radius: 5px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 25px;
  border-radius: 5px;
`;
const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
  opacity: ${props => !props.enabled ? 0.5 : 1};
`;
const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`
const RowModel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;

`;
const Parceiros= () => {
  const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate password and set passwordInvalid state accordingly
        if (password.length < 8) {
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }
    }

    const usernameEntered = (e) => {
        setUsername(e.target.value);
        // buttonEnabled(username, password)
    }

    const passwordEntered = (e) => {
        setPassword(e.target.value);
        // buttonEnabled(username, password)
    }

    const buttonEnabled = (username, password) => {
        if(username.length > 0 && password.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Container1>
      <h1>FAÇA LOGIN PARA ACESSAR OS FORMULARIOS</h1>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </Container1>;
  }
  if (!userRole) {
    return (
      <Container1>
        <h2> Olá {user.name}, </h2>
        <p>Deseja acessar o formulário para investidor ou quer se tornar um parceiro Eco-sustentável?</p>
        <div style={{ display: 'flex', gap: '1rem'}}>
        <Button onClick={() => setUserRole('investor')}>Investidor</Button>
        <Button onClick={() => setUserRole('projetist')}>Parceiro Eco-Sustentável</Button>
        </div>
      </Container1>
    );
  }
    return (
      <Container>
        {userRole === 'investor' && (
        <div>
          <h2>Investor Form</h2>
          
          <button onClick={() => setUserRole('')}>Change Role</button>
        </div>
      )}
      {userRole === 'projetist' && (
        <RowModel>
          
          <StyledForm onSubmit={handleSubmit}>
          <h2>Projetist Form</h2>
            <RowModel>
            <StyledLabel>CPF/CNPJ:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            <StyledLabel>EMPRESA:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            </RowModel>
            <RowModel>
            <StyledLabel>SEGMENTO:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            <StyledLabel>NOME DO REPRESENTANTE:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            </RowModel>
            <StyledLabel>CARGO:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            <StyledLabel>CELULAR:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            <StyledLabel>CIDADE:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            <StyledLabel>ESTADO:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>
            <StyledLabel>RESUMO:</StyledLabel>
            <StyledInput type="text" value={username} onChange={e => usernameEntered(e)}/>

            <div style={{ justifyContent: 'space-between' }}>
            <StyledButton type="submit" disabled={!username || !password}>Login</StyledButton>
            <StyledButton style={{ marginLeft: '100px' }} onClick={() => setUserRole('')}>Change Role</StyledButton>
            </div>
        </StyledForm>
          
        </RowModel>
      )}
      </Container>
    );
  }

export default Parceiros;