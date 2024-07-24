import './App.css'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationPage from './pages/registration/Registration'
import LoginPage from './pages/login/Login'
import Navbar from './components/navbar/Navbar';

import MainPage from './pages/main/MainPage'


function App() {

  const isAuthenticated = () => {
    // Replace this with actual authentication logic
    return localStorage.getItem('token') ? true : false;
  };

  return (
    <ChakraProvider>
      <BrowserRouter basename="/">
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegistrationPage />} />
          <Route exact path='/' element={<MainPage />} />
         {/*<Route exact path="/" element={isAuthenticated() ? <Navigate to="/login" /> : <Navigate to="/register" />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
