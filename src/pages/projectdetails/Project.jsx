import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectContext';
import MilestoneTracker from '../../components/project/milestonesection/MilestoneTracker';
import { FaCalendarAlt, FaClock, FaUsers, FaChartLine, FaTasks, FaEdit, FaCheck } from 'react-icons/fa';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  IconButton,
  CircularProgress,
  Chip,
  Divider,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/system';

const Project = () => {
  const { projectId } = useParams();
  const { currentProject, fetchProjectById } = useProjects();
  const [expandedSection, setExpandedSection] = useState(null);

  const milestones = [
    { label: 'Start', description: 'Project kickoff', completed: true },
    { label: 'Planning', description: 'Define project scope and timeline', completed: true },
    { label: 'Design', description: 'Create wireframes and mockups', completed: false },
    { label: 'Development', description: 'Build the application', completed: false },
    { label: 'Testing', description: 'Perform QA and user testing', completed: false },
    { label: 'Launch', description: 'Deploy the application', completed: false },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design UI mockups', status: 'In Progress', assignee: 'Jane Smith' },
    { id: 2, title: 'Implement user authentication', status: 'To Do', assignee: 'Mike Johnson' },
    { id: 3, title: 'Write project documentation', status: 'Completed', assignee: 'John Doe' },
    { id: 4, title: 'Set up CI/CD pipeline', status: 'In Progress', assignee: 'Emily Brown' },
    { id: 5, title: 'Conduct user testing', status: 'To Do', assignee: 'Sarah Lee' },
    { id: 6, title: 'Optimize database queries', status: 'Completed', assignee: 'Alex Chen' },
    { id: 7, title: 'Implement responsive design', status: 'In Progress', assignee: 'Chris Taylor' },
    { id: 8, title: 'Fix reported bugs', status: 'To Do', assignee: 'Mike Johnson' },
    { id: 9, title: 'Update dependencies', status: 'Completed', assignee: 'Jane Smith' },
    { id: 10, title: 'Create user onboarding flow', status: 'To Do', assignee: 'Emily Brown' }
  ]);

  const teamMembers = [
    { name: 'John Doe', role: 'Project Manager', avatar: 'https://avatar.iran.liara.run/public/16' },
    { name: 'Jane Smith', role: 'Designer', avatar: 'https://avatar.iran.liara.run/public/97' },
    { name: 'Mike Johnson', role: 'Developer', avatar: 'https://avatar.iran.liara.run/public/43' },
  ];

  const recentActivities = [
    { date: '2024-08-25', description: 'Updated project timeline' },
    { date: '2024-08-24', description: 'Completed milestone: Planning' },
    { date: '2024-08-23', description: 'Added new team member: Jane Smith' },
  ];

  useEffect(() => {
    fetchProjectById(projectId);
  }, [projectId, fetchProjectById]);

  if (!currentProject) {
    return <CircularProgress />;
  }

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: task.status === 'Completed' ? 'In Progress' : 'Completed' };
      }
      return task;
    }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Box sx={{ margin: '0 auto', padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h1">{currentProject.name}</Typography>
        <Chip label="In Progress" color="success" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h2" onClick={() => toggleSection('description')} sx={{ cursor: 'pointer' }}>
              Description
            </Typography>
            <Collapse in={expandedSection === 'description'}>
              <Typography>{currentProject.description}</Typography>
            </Collapse>
          </Paper>

          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h2">Project Milestones</Typography>
            <MilestoneTracker milestones={milestones} />
          </Paper>

          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h2" onClick={() => toggleSection('tasks')} sx={{ cursor: 'pointer' }}>
              <FaTasks /> Tasks
            </Typography>
            <Collapse in={expandedSection === 'tasks'}>
              <List>
                {tasks.map((task) => (
                  <ListItem key={task.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText primary={task.title} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={task.status}
                        color={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'info' : 'warning'}
                        onClick={() => toggleTaskStatus(task.id)}
                        icon={task.status === 'Completed' ? <FaCheck /> : null}
                      />
                      <Typography sx={{ marginLeft: 2 }}>{task.assignee}</Typography>
                      <IconButton onClick={() => openEditMode(task.id)}>
                        <FaEdit />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Paper>

          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h2">Recent Activities</Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText primary={activity.description} secondary={activity.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h2">Project Details</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FaClock />
                </ListItemIcon>
                <ListItemText primary="Duration: 3 Weeks" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FaCalendarAlt />
                </ListItemIcon>
                <ListItemText primary="Deadline: 13 August 2024" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FaUsers />
                </ListItemIcon>
                <ListItemText primary={`Team: ${teamMembers.length} Members`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FaChartLine />
                </ListItemIcon>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '30%', backgroundColor: '#e0e0e0', height: 10, borderRadius: 5, marginRight: 1 }}>
                    <Box sx={{ width: '33%', backgroundColor: '#4caf50', height: 10, borderRadius: 5 }}></Box>
                  </Box>
                  <Typography>Progress: 33%</Typography>
                </Box>
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h2">Team Members</Typography>
            <List>
              {teamMembers.map((member, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={member.avatar} alt={member.name} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} secondary={member.role} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Project;
