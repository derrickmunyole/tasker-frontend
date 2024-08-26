import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { TasksProvider } from './contexts/TaskContext';
import { ProjectProvider } from './contexts/ProjectContext';
import AppRoutes from './Routes';

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
