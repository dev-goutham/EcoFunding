import React from "react";
import styled  from "styled-components";
import Sidebar from "./Sidebar.jsx";
function AdminDashboard() {
    return (
        <Container>
        <Sidebar />
        </Container>
    );
    }
    
export default AdminDashboard;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
    `;
const Title = styled.h1`

`;
const SubTitle = styled.h3`
    
    `;
