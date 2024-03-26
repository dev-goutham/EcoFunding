import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Header from './components/Header.js';
import { HashRouter as Router } from "react-router-dom";
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import Rodape from 'components/Rodape.js';
// name: 
// domain: dev-fo5w6egbquu50h0p.us.auth0.com
// clientID: 2rgsfqcqwDUVTEEDHJkOZPNL7jlQ4syi
// client secret: 9blReTF9IgISIKPRz6aYdmQ4ZeiXmfwtTdbU4RsPVJHqErkaUGBm-7cgOwRWkcVr

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
  <Auth0Provider
    domain="dev-fo5w6egbquu50h0p.us.auth0.com"
    clientId="2rgsfqcqwDUVTEEDHJkOZPNL7jlQ4syi"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}>
  <Router>
  <Header  />
    <App />
  <Rodape id="rodape" />
    </Router>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
