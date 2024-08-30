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
      main: '#0F286B', // Primary color
      contrastText: '#FFFFFF', // Text color for primary buttons
    },
    secondary: {
      main: '#CC5500', // Secondary color
      contrastText: '#FFFFFF', // Text color for secondary buttons
    },
    background: {
      default: '#F5F5F5', // Default background color
      paper: '#FFFFFF', // Background color for paper components
    },
    text: {
      primary: '#0F286B', // Primary text color
      secondary: '#CC5500', // Secondary text color
      disabled: '#BDBDBD', // Disabled text color
      hint: '#757575', // Hint text color
    },
    accent: {
      main: '#FF4081', // Accent color
    },
    error: {
      main: '#F44336', // Error color
    },
    warning: {
      main: '#FF9800', // Warning color
    },
    info: {
      main: '#2196F3', // Info color
    },
    success: {
      main: '#4CAF50', // Success color
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500,
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
    borderRadius: 4, // Default border radius
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
