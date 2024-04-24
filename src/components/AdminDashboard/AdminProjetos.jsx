import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import Projetos from "./Projetos.jsx";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

function AdminForm() {
  
  return (
    <Container>
    <Content>
      <Sidebar />
        <ErrorBoundary>
        <Projetos />
        </ErrorBoundary>
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
