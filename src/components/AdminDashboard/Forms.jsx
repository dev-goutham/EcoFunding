import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
`;

const FormItem = styled.div`
  width: 20rem; /* Occupying 80% of the container width */
  margin: 0.1rem 0; /* Adjusted for vertical spacing */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition for expanding/collapsing */
  overflow: hidden; /* Ensure the content expands within the container */
  font-family: 'Dm Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  p {
    margin: 0;
  }
`;

const FormDetails = ({ form }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormItem onClick={() => setIsVisible(!isVisible)}>
      {isVisible ? (
        <>
          {form.role === "Parceiro" ? (
            <>
              <p><strong>CNPJ/CPF:</strong> {form.cnpjCpf || ''}</p>
              <p><strong>Empresa:</strong> {form.empresa || ''}</p>
              <p><strong>Email:</strong> {form.email || ''}</p>
              <p><strong>Segmento:</strong> {form.segmento || ''}</p>
              <p><strong>Nome do representante:</strong> {form.nomeRepresentante || ''}</p>
              <p><strong>Cargo:</strong> {form.cargo || ''}</p>
              <p><strong>Cidade:</strong> {form.cidade || ''}</p>
              <p><strong>Estado:</strong> {form.estado || ''}</p>
            </>
          ) : (
            <>
              <p><strong>CNPJ:</strong> {form.cnpj || ''}</p>
              <p><strong>E-mail corporativo:</strong> {form.emailCorporativo || ''}</p>
              <p><strong>Nome da empresa:</strong> {form.nomeEmpresa || ''}</p>
              <p><strong>Nome do representante:</strong> {form.nomeDoRepresentante || ''}</p>
              <p><strong>Cargo:</strong> {form.cargoInvestidor || ''}</p>
            </>
          )}
        </>
      ) : (
        // Show a summary or less detailed info when not clicked
        <p><strong>Nome:</strong> {form.nomeRepresentante || form.nomeDoRepresentante}</p>
      )}
    </FormItem>
  );
};

// Forms component adjustment for layout
const Forms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const formsCollectionRef = collection(firestore, 'submissions');
      const data = await getDocs(formsCollectionRef);
      setForms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchForms();
  }, []);

  return (
    <>
     
    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', minHeight: '70vh', marginTop: '2rem' }}>
     
      <div style={{ width: '40%' }}>
      <h2 style={{ textAlign: 'center', margin: '2rem 12rem' }}>FORMULÁRIO PARCEIROS</h2>
      <Container>
        {forms.filter(form => form.role === "Parceiro").map((form) => (
          <FormDetails key={form.id} form={form} />
        ))}
      </Container>
      </div>
      <div style={{ width: '40%'}}>
      <h2 style={{ textAlign: 'center', margin: '2rem 12rem' }}>FORMULARIO INVESTIDORES</h2>
      <Container>
        {forms.filter(form => form.role === "Investidor").map((form) => (
          <FormDetails key={form.id} form={form} />
        ))}
      </Container>
      </div>
    </div>
    </>
  );
};

export default Forms;
