import React from "react";
import styled from "styled-components";

function Sidebar() {
  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <a> Projetos </a>
      <a> Usuários </a>
      <a> Formulários </a>
      <a> Configurações </a>
    </Container>
  );
}
export default Sidebar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 20%;
    background-color: #242a32;
    padding: 0 50px;
    text-align: center;
    a {
        color: #fff;
        text-decoration: none;
        margin: 10px 0;
        font-size: 20px;
        cursor: pointer;
    }
    `;
const Title = styled.h1`
    color: #fff
    `;