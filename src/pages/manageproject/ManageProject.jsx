import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';

function ManageProject() {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState('list');

  const projects = [
    { id: 1, name: "Website Redesign", duration: "3 months", deadline: "2024-11-30", status: "In Progress" },
    { id: 2, name: "Mobile App Development", duration: "6 months", deadline: "2025-02-15", status: "Planning" },
    { id: 3, name: "Database Migration", duration: "2 months", deadline: "2024-10-31", status: "Completed" },
    { id: 4, name: "AI Integration", duration: "4 months", deadline: "2025-01-20", status: "Not Started" },
  ];

  const handleArchive = (projectId) => {
    console.log(`Archiving project with id: ${projectId}`);
  };

  const handleDelete = (projectId) => {
    console.log(`Deleting project with id: ${projectId}`);
  };

  const toggleView = (mode) => {
    setViewMode(mode);
  };

  const ListView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6" color="primary">Project</Typography></TableCell>
            <TableCell><Typography variant="h6" color="primary">Duration</Typography></TableCell>
            <TableCell><Typography variant="h6" color="primary">Deadline</Typography></TableCell>
            <TableCell><Typography variant="h6" color="primary">Status</Typography></TableCell>
            <TableCell><Typography variant="h6" color="primary">Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(project => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.duration}</TableCell>
              <TableCell>{project.deadline}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleArchive(project.id)} color="primary">
                  <ArchiveIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(project.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const GridView = () => (
    <Grid container spacing={3}>
      {projects.map(project => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">{project.name}</Typography>
              <Typography variant="body2">Duration: {project.duration}</Typography>
              <Typography variant="body2">Deadline: {project.deadline}</Typography>
              <Typography variant="body2">Status: {project.status}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleArchive(project.id)} color="primary">
                <ArchiveIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(project.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(3) }}>
        <Typography variant="h2" color="primary">Manage Project</Typography>
        <Box>
          <IconButton color="primary" onClick={() => toggleView('list')} disabled={viewMode === 'list'}>
            <ListIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => toggleView('grid')} disabled={viewMode === 'grid'}>
            <GridViewIcon />
          </IconButton>
        </Box>
      </Box>
      
      {viewMode === 'list' ? <ListView /> : <GridView />}
    </Box>
  );
}

export default ManageProject;
