import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RecurringTaskForm = ({ onClose, onSubmit }) => {
  const [taskDetails, setTaskDetails] = useState({
    name: '',
    description: '',
    recurrenceType: 'daily',
    startDate: new Date(),
    endType: 'never',
    endDate: null,
    endOccurrences: 1,
    time: new Date(),
    priority: 'medium',
    reminder: false,
    reminderTime: '15',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskDetails);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Create Recurring Task
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Task Name"
              value={taskDetails.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Task Description"
              value={taskDetails.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>Recurrence Details</Divider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="repeat-label">Repeat</InputLabel>
              <Select
                labelId="repeat-label"
                id='repeat'
                label="Repeat"
                name="recurrenceType"
                value={taskDetails.recurrenceType}
                onChange={handleInputChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={taskDetails.startDate}
              onChange={(newValue) => handleDateChange('startDate', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>End</InputLabel>
              <Select
                labelId="end-label"
                id='end'
                label="End"
                name="endType"
                value={taskDetails.endType}
                onChange={handleInputChange}
              >
                <MenuItem value="never">Never</MenuItem>
                <MenuItem value="after">After</MenuItem>
                <MenuItem value="on">On Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Time"
              value={taskDetails.time}
              onChange={(newValue) => handleDateChange('time', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>Additional Details</Divider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                labelId="priority-label"
                id='priority'
                label="Priority"
                name="priority"
                value={taskDetails.priority}
                onChange={handleInputChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={taskDetails.reminder}
                  onChange={(e) =>
                    setTaskDetails((prev) => ({
                      ...prev,
                      reminder: e.target.checked,
                    }))
                  }
                  name="reminder"
                />
              }
              label="Enable Reminder"
            />
          </Grid>
          {taskDetails.reminder && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Reminder Time</InputLabel>
                <Select
                  name="reminderTime"
                  value={taskDetails.reminderTime}
                  onChange={handleInputChange}
                >
                  <MenuItem value="15">15 minutes before</MenuItem>
                  <MenuItem value="60">1 hour before</MenuItem>
                  <MenuItem value="1440">1 day before</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Additional Notes"
              value={taskDetails.notes}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Recurring Task
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default RecurringTaskForm;
