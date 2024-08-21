import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RegistrationPage from './pages/registration/Registration'
import LoginPage from './pages/login/Login'
import MainPage from './layouts/main/MainPage'
import Home from './pages/home/Home'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import Inbox from './pages/inbox/Inbox';
import ManageProject from './pages/manageproject/ManageProject';
import { TasksProvider } from './contexts/TaskContext';
import { ProjectProvider } from './contexts/ProjectContext';

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ width: 100, height: 100, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route element={
        isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />
      }>
        <Route path="/home" element={<Home />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/manage-projects' element={<ManageProject />} />
        {/* Add other authenticated routes here */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

const CompositeProvider = ({ children }) => (
  <ChakraProvider>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <UserProvider>
            <TasksProvider>
              <ProjectProvider>
                {children}
              </ProjectProvider>
            </TasksProvider>
          </UserProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </ChakraProvider>
);

function App() {
  return (
    <CompositeProvider>
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </CompositeProvider>
  );
}

export default App
