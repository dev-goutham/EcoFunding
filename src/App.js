
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import './App.css'
import HomePage from './assets/pages/HomePage.jsx';
import Register from './assets/pages/Register.jsx';
import Page1 from './assets/pages/Page1.jsx';
import Page2 from './assets/pages/Page2.jsx';
import Page3 from './assets/pages/Page3.jsx';
import Page4 from './assets/pages/Page4.jsx';
import Page5 from './assets/pages/Page5.jsx';
import Login from './assets/pages/Login.jsx';
import PainelDeControle from './assets/pages/PainelDeControle.jsx';
import { createGlobalStyle } from 'styled-components';
import ProtectedRoute from './assets/pages/PortectedRoute.jsx';
import AdminDashboardPage from 'assets/pages/AdminDashboardPage.jsx';
import AdminRoute from 'assets/pages/AdminRoute.jsx';
import AdminFormPage from 'assets/pages/AdminForm.jsx';
import AdminLogin from 'assets/pages/AdminLogin.jsx';
import PainelCreditosAmbientais from 'assets/pages/PainelCreditosAmbientais.jsx';
import ProjetosBoard from './components/Dashboard/ProjetosBoard.jsx';
import PainelRelatorios from 'assets/pages/PainelRelatorios.jsx';


   export const GlobalStyle = createGlobalStyle`
     @import url('https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

     body {
       margin: 0;
       padding: 0;
       font-family: 'Lexend Tera', sans-serif;
     }
   `;


function App() {
  return (
   
    <div>
      <GlobalStyle />
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2/>} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <PainelDeControle />
        </ProtectedRoute>} />
        <Route path="/dashboard/projetos" element={<ProtectedRoute>
          <ProjetosBoard />
        </ProtectedRoute>} />
        <Route path="/dashboard/creditosambientais" element={<ProtectedRoute>
          <PainelCreditosAmbientais />
        </ProtectedRoute>} />
        <Route path="/dashboard/relatorios" element={<ProtectedRoute>
          <PainelRelatorios />
        </ProtectedRoute>} />
       
        <Route path="/admindashboard" element={<AdminRoute>
          <AdminDashboardPage />
        </AdminRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="adminform" element={<AdminRoute><AdminFormPage /> </AdminRoute>} />

      </Routes>
    </div>

    
  );
}

export default App;