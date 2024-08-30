import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderIcon from '@mui/icons-material/Folder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
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

const GlanceItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
}));

const GlanceIcon = styled(Box)(({ theme }) => ({
    fontSize: '2rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

function Home() {
    const { user: authUser } = useAuth();
    const { user, loading } = useUser();
    const { projects, fetchProjects } = useProjects();

    const glanceItems = [
        { label: 'Total Projects', value: projects.length, icon: <FolderIcon /> },
        { label: 'Projects Completed', value: projects.filter(p => p.status === 'completed').length, icon: <CheckCircleIcon /> },
        { label: 'Tasks due today', value: 5, icon: <EventIcon /> }, // Replace with actual data
        { label: 'Overdue tasks', value: 2, icon: <WarningIcon /> }, // Replace with actual data
    ];

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
                            {glanceItems.map((item, index) => (
                                <Grid item xs={6} sm={3} key={index}>
                                    <GlanceItem>
                                        <GlanceIcon>{item.icon}</GlanceIcon>
                                        <Typography variant="h6" align="center">{item.value}</Typography>
                                        <Typography variant="body2" align="center">{item.label}</Typography>
                                    </GlanceItem>
                                </Grid>
                            ))}
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
