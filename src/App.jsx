import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CssBaseline } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { TasksProvider } from './contexts/TaskContext';
import { ProjectProvider } from './contexts/ProjectContext';
import AppRoutes from './Routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F286B', 
      contrastText: '#FFFFFF', 
    },
    secondary: {
      main: '#CC5500', 
      contrastText: '#FFFFFF', 
    },
    background: {
      default: '#F5F5F5', 
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#0F286B', 
      secondary: '#CC5500', 
      disabled: '#BDBDBD', 
      hint: '#757575', 
    },
    accent: {
      main: '#FF4081', 
    },
    error: {
      main: '#F44336', 
    },
    warning: {
      main: '#FF9800', 
    },
    info: {
      main: '#2196F3', 
    },
    success: {
      main: '#4CAF50', 
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '1.125rem',
      fontWeight: 500,
      },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 300,
    },
    button: {
      textTransform: 'none', // Prevents automatic uppercase transformation
    },
  },
  spacing: 8, 
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 4,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
  // ... other theme customizations
});


const CompositeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
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
