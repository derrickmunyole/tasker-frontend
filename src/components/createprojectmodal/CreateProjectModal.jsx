import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProjects } from '../../contexts/ProjectContext';
import SuccessIndicator from '../../components/successcomponent/SuccessWidget';

function CreateProjectModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { createProject, fetchProjects } = useProjects();

  const handleCreateProject = async () => {
    try {
      await createProject({ name, description });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
      fetchProjects(true)
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: 'white',
          boxShadow: 'none',
        },
      }}
    >

      <DialogTitle>
        {!showSuccess && "Create New Project"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {showSuccess ? (
            <>
              <SuccessIndicator />
              <Typography variant="h6" sx={{ mt: 6 }}>Project created</Typography>
            </>
          ) : (
            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
          )}
        </Box>
      </DialogContent>

      {!showSuccess && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateProject}>
            Create Project
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CreateProjectModal;
