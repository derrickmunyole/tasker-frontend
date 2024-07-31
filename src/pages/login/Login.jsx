import React, { useState } from 'react';
import { Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import './Login.css';
import {loginUser} from '../../api/auth'
import { useAuth } from '../../contexts/AuthContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { setIsAuthenticated } = useAuth();

    const navigate = useNavigate()

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
        console.log('submitting...')
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await loginUser(email, password);

                console.log(response)

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

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
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
                    />
                    {errors.email && <Text color="red.500">{errors.email}</Text>}
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    {errors.password && <Text color="red.500">{errors.password}</Text>}
                    <Button type="submit" mt={4} colorScheme='blue'>Login</Button>
                    <HStack justifyContent="center">
                        <Text>Don't have an account?</Text>
                        <Text as="a" href="/register">Create one</Text>
                    </HStack>
                </VStack>
            </form>
        </div>
    );
};

export default Login;
