import React, { useState } from 'react';
import { Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

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
                <Text fontSize="xl">Welcome!</Text>
            </HStack>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                errorcontent={<Text color="red.500">{errors.email}</Text>}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                errorcontent={<Text color="red.500">{errors.password}</Text>}
            />
            <Button onClick={handleSubmit} mt={4} colorScheme='blue'>Login</Button>
            <HStack justifyContent="center">
                <Text>Don't have an account?</Text>
                <Text as="a" href="/register">Create one</Text>
            </HStack>
        </VStack>
        </div>
    );
};

export default Login;
