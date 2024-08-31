import React, { useState } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';

const MilestoneTracker = ({ initialMilestones=[] }) => {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);

  const completedMilestones = milestones.filter((m) => m.completed).length;
  const progress = (completedMilestones / milestones.length) * 100;

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(selectedMilestone === milestone ? null : milestone);
  };

  const handleAddMilestone = () => {
    setEditingMilestone({ label: '', description: '', completed: false });
    setDialogOpen(true);
  };

  const handleEditMilestone = (milestone) => {
    setEditingMilestone({ ...milestone });
    setDialogOpen(true);
  };

  const handleSaveMilestone = () => {
    if (editingMilestone.id) {
      setMilestones(
        milestones.map((m) =>
          m.id === editingMilestone.id ? editingMilestone : m
        )
      );
    } else {
      setMilestones([
        ...milestones,
        { ...editingMilestone, id: Date.now() },
      ]);
    }
    setDialogOpen(false);
  };

  const handleRemoveMilestone = (id) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleToggleComplete = (id) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  return (
    <Box sx={{ width: '100%', my: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="subtitle1" gutterBottom>
        Milestones ({completedMilestones}/{milestones.length})
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      <List>
        {milestones.map((milestone) => (
          <ListItem
            key={milestone.id}
            onClick={() => handleMilestoneClick(milestone)}
            sx={{
              cursor: 'pointer',
              bgcolor: selectedMilestone === milestone ? 'primary.light' : 'inherit',
              '&:hover': { bgcolor: 'action.hover' },
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemIcon onClick={(e) => { e.stopPropagation(); handleToggleComplete(milestone.id); }}>
              {milestone.completed ? (
                <CheckCircle color="success" />
              ) : (
                <RadioButtonUnchecked />
              )}
            </ListItemIcon>
            <ListItemText
              primary={milestone.label}
              secondary={selectedMilestone === milestone ? milestone.description : null}
            />
            <IconButton onClick={(e) => { e.stopPropagation(); handleEditMilestone(milestone); }}>
              <Edit />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveMilestone(milestone.id); }}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button startIcon={<Add />} onClick={handleAddMilestone}>
        Add Milestone
      </Button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editingMilestone?.id ? 'Edit Milestone' : 'Add Milestone'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Milestone Label"
            fullWidth
            value={editingMilestone?.label || ''}
            onChange={(e) => setEditingMilestone({ ...editingMilestone, label: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Milestone Description"
            fullWidth
            multiline
            rows={4}
            value={editingMilestone?.description || ''}
            onChange={(e) => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveMilestone}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MilestoneTracker;
