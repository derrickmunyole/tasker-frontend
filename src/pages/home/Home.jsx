import React from 'react';
import { Box, Grid, Paper, Typography, LinearProgress, Chip, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccessTime, Assignment, Group, Flag } from '@mui/icons-material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CommentSection from '../../components/project/commentsection/CommentSection';

const localizer = momentLocalizer(moment);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const ProgressBar = ({ value, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" value={value} color={color} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
    </Box>
  </Box>
);

function Home() {
  const projectsData = [
    {
      name: "Project Phoenix",
      progress: 65,
      teamSize: 8,
      deadline: new Date(2024, 11, 31),
      status: "On Track",
    },
    {
      name: "Task Management System",
      progress: 30,
      teamSize: 5,
      deadline: new Date(2024, 9, 15),
      status: "At Risk",
    },
    {
      name: "Mobile App Redesign",
      progress: 80,
      teamSize: 3,
      deadline: new Date(2024, 8, 30),
      status: "Ahead",
    },
    {
      name: "AI Integration Platform",
      progress: 45,
      teamSize: 6,
      deadline: new Date(2025, 2, 1),
      status: "On Track",
    },
    {
      name: "Cloud Migration Project",
      progress: 10,
      teamSize: 4,
      deadline: new Date(2025, 5, 30),
      status: "Just Started",
    },
  ];

  const recentActivities = [
    { text: "New feature proposal submitted for Project Phoenix", date: "2024-08-28" },
    { text: "Team meeting - Sprint planning for Task Management System", date: "2024-08-29" },
    { text: "UI/UX review completed for Mobile App Redesign", date: "2024-08-30" },
    { text: "Kickoff meeting for AI Integration Platform", date: "2024-08-31" },
    { text: "Cloud Migration Project initiation", date: "2024-09-01" },
    { text: "Bug fixes deployed for Task Management System", date: "2024-09-02" },
    { text: "Project Phoenix milestone reached", date: "2024-09-03" },
  ];

  const comments = [
    {
      author: 'John Doe',
      avatar: '/path/to/avatar.jpg',
      projectName: 'Project Alpha',
      taskName: 'Implement Login',
      text: 'This task is almost complete. Just need to add error handling.',
      date: '2024-08-28T14:30:00Z'
    },
    // ... more comments
  ];

  const calendarEvents = projectsData.map(project => ({
    title: `${project.name} Deadline`,
    start: project.deadline,
    end: project.deadline,
    allDay: true,
  }));
  

  const getStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "success";
      case "At Risk":
        return "warning";
      case "Ahead":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            <StyledPaper>
                <Typography variant="h6" gutterBottom>Project Overview</Typography>
                {projectsData.map((project, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1">{project.name}</Typography>
                            <Box>
                                <Chip label={`Deadline: ${project.deadline.toLocaleDateString()}`} icon={<AccessTime />} size="small" sx={{ mr: 1 }} />
                                <Chip label={project.status} color={getStatusColor(project.status)} size="small" />
                            </Box>
                        </Box>
                        <ProgressBar value={project.progress} color="primary" />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                <Assignment fontSize="small" /> Tasks: {Math.round(project.progress / 10)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Group fontSize="small" /> Team Size: {project.teamSize}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StyledPaper>
                        <Typography variant="h6" gutterBottom>Recent Activities</Typography>
                        <List>
                            {recentActivities.slice(0, 5).map((activity, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemIcon>
                                        <Flag color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={activity.text}
                                        secondary={activity.date}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                        secondaryTypographyProps={{ variant: 'caption' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <StyledPaper>
                        <Typography variant="h6" gutterBottom>Recent Comments</Typography>
                        <CommentSection comments={comments.slice(0, 3)} compact={true} />
                    </StyledPaper>
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12}>
            <StyledPaper>
                <Typography variant="h6" gutterBottom>Project Calendar</Typography>
                <Box sx={{ height: 400 }}>
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                    />
                </Box>
            </StyledPaper>
        </Grid>
    </Grid>
</Box>
  );
}

export default Home;
