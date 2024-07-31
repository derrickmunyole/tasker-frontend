import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationPage from './pages/registration/Registration'
import LoginPage from './pages/login/Login'
import MainPage from './layouts/main/MainPage'
import Home from './pages/home/Home'
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{width:100,height:100, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Loading...</div>;
  }

  return (
    <Routes>
      <Route element={
        isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />
      }>
        <Route path="/home" element={<Home />} />
        {/* Add other authenticated routes here */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter basename="/">
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App
