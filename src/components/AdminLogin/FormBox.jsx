import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Form, Wrapper, Terms } from './style/Form.styled.js';
import InputField from './InputField.jsx';
import { Input } from '@mui/icons-material';
const allowedUIDs = ["EsanDapF1VQVartYTvCWUdVu3BB3", "REE95WSUXvRPzPa9kUTMJ86jbTf2"]; // Update with actual UIDs

function FormBoxLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed in 
        const user = userCredential.user;

        // Check if the user's UID is in the allowedUIDs list
        if (!allowedUIDs.includes(user.uid)) {
          // Not an allowed user, sign them out
          signOut(auth).then(() => {
            // Optionally, redirect to login page or show an unauthorized message
            alert("You are not authorized to access this application.");
            navigate('/'); // Adjust as necessary
          });
        } else {
          // User is authorized, redirect to the dashboard or appropriate page
          navigate('/admindashboard'); // Adjust as necessary
        }
      })
      .catch((error) => {
        // Handle Errors here.
        alert(error.message);
        // Optionally, update state to display error message to the user
      });
  };

  return (
    <Form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginLeft: '8em' }}>
      <InputField 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
        
      />
      <InputField 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
        
      />
      <button style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#2ee21f', border: 'none', color: 'white' }} type="submit">Login</button>
    </Form>
  );
}

export default FormBoxLogin;
