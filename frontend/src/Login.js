import React, { useState } from 'react';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import itsLogo from '../src/images/itslogo.png'; // Adjust path if necessary



function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (error.email === "" && error.password === "") {
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data === "Success") {
                    navigate('/home');
                } else {
                    alert("Invalid Credentials");
                }
            })
            .catch(err => console.log(err));
        }
    };

    const handleInput = (event) => (
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    );

    return (
        <div className="container">
            <img src={itsLogo} alt="Logo" className="logo" />

            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter Email' name='email'
                    id="email" onChange={handleInput}/>
                    {error.email && <span className='text-danger'>{error.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter Password'
                    name='password' id="password" 
                    onChange={handleInput}/>
                    {error.password && <span className='text-danger'>{error.password}</span>}
                </div>
                <button type='submit' className='btn btn-success'>Log In</button>
                <p>Create an Account: <a href="./signup" className=''>Register here</a></p>
            </form>
        </div>
    );
}

export default Login;
