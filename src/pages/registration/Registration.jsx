import React, { useState } from 'react';
import { Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
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
        <VStack spacing={4}>
            <HStack>
                <Text fontSize="xl">Register an account</Text>
            </HStack>
            <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                isInvalid={!!errors.username}
                errorContent={<Text color="red.500">{errors.username}</Text>}
            />
            <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                isInvalid={!!errors.email}
                errorContent={<Text color="red.500">{errors.email}</Text>}
            />
            <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                isInvalid={!!errors.password}
                errorContent={<Text color="red.500">{errors.password}</Text>}
            />
            <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                isInvalid={!!errors.confirmPassword}
                errorContent={<Text color="red.500">{errors.confirmPassword}</Text>}
            />
            <Button onClick={handleSubmit} mt={4} colorScheme='blue'>Register</Button>
            <HStack justifyContent="center">
                <Text>Already have an account?</Text>
                <Text as="a" href="/login">Login</Text>
            </HStack>
        </VStack>
        </div>
    );
};

export default Registration;
