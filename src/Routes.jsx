import React, { useEffect } from 'react';
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
import AllProjects from './pages/allprojects/AllProjects';
import LoadingIndicator from './components/loadingcomponent/LoadingWidget';
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('isAuthenticated:', isAuthenticated);

  return (
    <Routes>
      <Route
        element={isLoading ? <LoadingIndicator/> : (isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />)}
      >
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace={true} /> : <Navigate to="/login" replace={true} />} />
        <Route path="*" element={isAuthenticated ? <Navigate to="/home" replace={true} /> : <Navigate to="/login" replace={true} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/today" element={<Today />} />
        <Route path="/manage-projects" element={<ManageProject />} />
        <Route path="all-projects" element={<AllProjects />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add other authenticated routes here */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default AppRoutes;
