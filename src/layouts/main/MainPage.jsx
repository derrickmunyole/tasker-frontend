import React from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';
import { TasksProvider } from '../../contexts/TaskContext';
import { ProjectProvider } from '../../contexts/ProjectContext';

const LayoutContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const NavbarWrapper = styled(Box)({
  flexShrink: 0, // Prevent navbar from shrinking
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flex: 1,
  overflow: 'hidden', // Prevent content from overflowing
});

const SidebarWrapper = styled(Box)({
  flexShrink: 0, // Prevent sidebar from shrinking
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10), // Add extra padding to the top
  overflowY: 'auto', // Allow scrolling in the main content area
}));

function Layout() {
  return (
    <LayoutContainer>
      <UserProvider>
        <TasksProvider>
          <ProjectProvider>
            <NavbarWrapper>
              <Navbar />
            </NavbarWrapper>
            <ContentWrapper>
              <SidebarWrapper>
                <Sidebar />
              </SidebarWrapper>
              <MainContent>
                <Outlet />
              </MainContent>
            </ContentWrapper>
          </ProjectProvider>
        </TasksProvider>
      </UserProvider>
    </LayoutContainer>
  );
}

export default Layout;
