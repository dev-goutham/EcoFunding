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

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password, name } = formData;

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
                setError(error.message);
                console.error(error.code, error.message);
            });
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={submitHandler}>
            {inputData.map(input => (
                <InputField
                    key={input.id}
                    {...input}
                    value={formData[input.name]}
                    onChange={changeHandler}
                />
            ))}
            <Wrapper>
                <ClaimButton />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Terms>
                    Clicando no botão você aceita nossos <span>Termos e serviços</span>
                </Terms>
            </Wrapper>
        </Form>
    );
};

export default FormBoxRegister;