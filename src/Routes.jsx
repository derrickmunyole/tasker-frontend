import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainPage from './layouts/main/MainPage';
import Home from './pages/home/Home';
import Inbox from './pages/inbox/Inbox';
import ManageProject from './pages/manageproject/ManageProject';
import LoginPage from './pages/login/Login';
import RegistrationPage from './pages/registration/Registration';
import Project from './pages/projectdetails/Project';
import Today from './pages/today/Today';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ width: 100, height: 100, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        element={isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/today" element={<Today />} />
        <Route path="/manage-projects" element={<ManageProject />} />
        <Route path="/project/:projectId" element={<Project />} />
        {/* Add other authenticated routes here */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default AppRoutes;
