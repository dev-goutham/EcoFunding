import React, { useState } from 'react';
import { Form, Wrapper, Terms } from './style/Form.styled.js';
import ClaimButton from './ClaimButton.jsx';
import InputField from './InputField.jsx';
import { inputData } from './data.js';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const FormBoxLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    // Translation function
    const translateErrorCodeToPortuguese = (errorCode) => {
        const errorMessages = {
            "auth/user-not-found": "Nenhum usuário encontrado com este e-mail.",
            "auth/wrong-password": "Senha incorreta. Por favor, tente novamente.",
            "auth/email-already-in-use": "Este e-mail já está sendo usado por outra conta.",
            "auth/weak-password": "A senha é muito fraca.",
            "auth/too-many-requests": "Muitas tentativas falhadas. Tente novamente mais tarde.",
            // Add more error codes and translations as needed
        };
        return errorMessages[errorCode] || "Ocorreu um erro. Por favor, tente novamente.";
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/dashboard");
            })
            .catch((error) => {
                const translatedError = translateErrorCodeToPortuguese(error.code);
                setError(translatedError);
                console.error(error.code, translatedError);
            });
    };

    const googleLoginHandler = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                navigate("/dashboard");
            })
            .catch((error) => {
                const translatedError = translateErrorCodeToPortuguese(error.code);
                setError(translatedError);
                console.error(error.code, translatedError);
            });
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler for navigating to the register page
    const handleRegisterNavigation = () => {
        navigate("/register"); // Use the path to your register route
    };

    return (
        <Form onSubmit={loginHandler}>
          <h1> LOGIN </h1>
            {inputData.map(input => (
                <InputField
                    key={input.id}
                    {...input}
                    value={formData[input.name]}
                    onChange={changeHandler}
                />
            ))}
            <Wrapper>
                <ClaimButton type="submit" />
                <button style={{ marginTop: '10px', width: '100%', height: '50px', backgroundColor: 'rgba(233, 232, 227, 0.753)', color: 'white' }} type="button" onClick={googleLoginHandler}>
                    Login com Google
                </button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <Terms>
                    Clicando no botão você aceita nossos <span>Termos e serviços</span>
                </Terms>
                <button onClick={handleRegisterNavigation} style={{ color: 'white', background: 'none', border: 'none', padding: '10px', cursor: 'pointer', fontFamily: 'Lexend Tera' }}>
                    CADASTRE-SE
                </button>
            </Wrapper>
        </Form>
    );
};

export default FormBoxLogin;
