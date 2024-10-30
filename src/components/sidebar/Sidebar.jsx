import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  styled
} from '@mui/material';
import {
  Home as HomeIcon,
  Inbox as InboxIcon,
  Today as TodayIcon,
  AssignmentInd as AssignedIcon,
  Folder as ProjectIcon,
  AddCircleOutline as CreateIcon,
  Settings as ManageIcon,
  Height
} from '@mui/icons-material';
import CreateProjectModal from '../createprojectmodal/CreateProjectModal';
import { theme } from '../../App';

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: 'relative',
    height: 'calc(100vh - 64px)', // Subtract navbar height
    marginTop: '64px', // Add top margin to account for navbar
    overflowY: 'auto', // Allow sidebar to scroll if content is too long
    flexShrink: 0,
    paddingTop: theme.spacing(4),
  },
}));

const SidebarLink = styled(RouterLink)(({ theme }) => ({
  '&&': {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }
}));


function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const linkItems = [
    { text: 'Home', icon: <HomeIcon />, to: '/home' },
    { text: 'Inbox', icon: <InboxIcon />, to: '/inbox' },
    { text: 'Today', icon: <TodayIcon />, to: '/today' },
    { text: 'Assigned to me', icon: <AssignedIcon />, to: '/assigned' },
    { text: 'Projects', icon: <ProjectIcon />, to: '/all-projects' },
    { text: 'Create Project', icon: <CreateIcon />, onClick: onOpen },
    { text: 'Manage Projects', icon: <ManageIcon />, to: '/manage-projects' },
  ];

  return (
    <>
      <Box component="nav" sx={{ height: '100%' }}> {/* Wrap in a Box with full height */}
        <SidebarContainer variant="permanent" anchor="left">
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {linkItems.slice(0, 4).map((item, index) => (
                <ListItem key={item.text} disablePadding>
                  <SidebarLink to={item.to} component={RouterLink}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </SidebarLink>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {linkItems.slice(4).map((item, index) => (
                <ListItem key={item.text} disablePadding>
                  <SidebarLink
                    to={item.to}
                    component={item.onClick ? 'button' : RouterLink}
                    onClick={item.onClick}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </SidebarLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </SidebarContainer>
        <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default Sidebar;
