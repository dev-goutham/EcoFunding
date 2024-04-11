import React from "react";
import styled  from "styled-components";
import Sidebar from "./Sidebar.jsx";
import Forms from "./Forms.jsx";
function AdminForm() {
    return (
        <Container>
        <Content>
        <Sidebar />
        <Forms />
        </Content>
        </Container>
    );
    }
    
export default AdminForm;

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: left;
background-color: #f9f9f9;
min-height: 100vh; /* Ensures that the container fills the entire height of the screen */
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
flex-grow: 1; /* Ensures that the content section takes the remaining space */
`;
