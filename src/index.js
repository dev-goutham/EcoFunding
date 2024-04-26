import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Header from './components/Header.js';
import { HashRouter as Router } from "react-router-dom";
import './index.css';
import { AuthProvider } from './config/AuthContext.js';
import Rodape from './components/Rodape.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
  <AuthProvider>
  <Router>
  <Header  />
    <App />
  <Rodape id="rodape" />
    </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
