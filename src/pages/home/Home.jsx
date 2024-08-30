import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import ProjectCard from '../../components/projectcard/ProjectCard';
import { useProjects } from '../../contexts/ProjectContext';
import CalendarWidget from '../../components/calendarwidget/CalendarWidget';
import UpcomingTasks from '../../components/upcomingtasks/UpcomingTasks';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
}));

function Home() {
  const { user: authUser } = useAuth();
  const { user, loading } = useUser();
  const { projects, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">
                Good evening, {user ? user.first_name : 'User'}
              </Typography>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Typography variant="h4" gutterBottom>
              At a glance
            </Typography>
            <Grid container spacing={2}>
              {['Total Projects', 'Projects Completed', 'Tasks due today', 'Overdue tasks'].map(
                (item, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <StyledPaper>
                      <Typography variant="body2">{item}</Typography>
                    </StyledPaper>
                  </Grid>
                )
              )}
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Activity Feed</Typography>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Box className="feed">
              {/* Add feed content here */}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Typography variant="h5">Active projects</Typography>
            <IconButton>
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="primary">
            See more
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <CalendarWidget projects={projects} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <UpcomingTasks projects={projects} />
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
