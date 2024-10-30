import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        console.log('submitting...');
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await loginUser(email, password);

                console.log(response);

                if (response.data.success) {
                    setIsAuthenticated(true);
                    navigate('/home');
                } else {
                    setErrors({ ...errors, login: 'Login failed. Please try again.' });
                }
            } catch (error) {
                setErrors({ ...errors, login: 'Login failed. Please try again.' });
            }
        } else {
            setErrors(validationErrors);
        }
    };
    
    useEffect(() => {
        console.log('isAuthenticated:', isAuthenticated);
        if (isAuthenticated) {
            navigate('/home');
          }
      }, [isAuthenticated]);

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Typography variant="h5">Welcome!</Typography>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                    <Stack direction="row" justifyContent="center" spacing={1}>
                        <Typography>Don't have an account?</Typography>
                        <Link href="/register">Create one</Link>
                    </Stack>
                </Stack>
            </form>
        </div>
    );
};

export default Login;
