import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Link } from '@mui/material';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!formData.username) {
            errors.username = 'Username is required';
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className='container'>
            <Stack spacing={2}>
                <Typography variant="h5">Register an account</Typography>
                <TextField
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />
                <Button onClick={handleSubmit} variant="contained" color="primary">Register</Button>
                <Stack direction="row" justifyContent="center" spacing={1}>
                    <Typography>Already have an account?</Typography>
                    <Link href="/login">Login</Link>
                </Stack>
            </Stack>
        </div>
    );
};

export default Registration;
