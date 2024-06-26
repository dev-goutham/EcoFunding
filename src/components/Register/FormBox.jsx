import React, { useState } from 'react';
import { Form, Wrapper, Terms } from './style/Form.styled.js';
import ClaimButton from './ClaimButton.jsx';
import InputField from './InputField.jsx';
import { inputData } from './data.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase.js'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const FormBoxRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state to manage loading status

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password, name } = formData;

        setIsLoading(true); // Indicate the start of a registration process
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Update the user profile with the name
                return updateProfile(userCredential.user, {
                    displayName: name,
                });
            })
            .then(() => {
                navigate("/dashboard");
            })
            .catch((error) => {
                const errorMessage = error.message;
                // Here, you could translate or map error messages to be more user-friendly
                setError(errorMessage);
                console.error(error.code, errorMessage);
            })
            .finally(() => {
                setIsLoading(false); // Reset loading status regardless of outcome
            });
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={submitHandler}>
            <h1> CADASTRO </h1>
            {inputData.map(input => (
                <InputField
                    key={input.id}
                    {...input}
                    value={formData[input.name]}
                    onChange={changeHandler}
                />
            ))}
            <Wrapper>
                {/* Disable the button while the registration is in progress */}
                <ClaimButton type="submit" disabled={isLoading} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Terms>
                    Clicando no botão você aceita nossos <span>Termos e serviços</span>
                </Terms>
            </Wrapper>
        </Form>
    );
};

export default FormBoxRegister;
