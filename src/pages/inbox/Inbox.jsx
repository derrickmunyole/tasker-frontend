import React, { useMemo, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
  Box,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  List,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskItem from '../../components/taskitem/TaskItem';
import RecurringTaskForm from '../../components/recurringtaskform/RecurringTaskForm';
import AddToProjectContent from '../../components/addtoprojectcontent/AddToProjectContent';
import AssignTaskContent from '../../components/assigntaskcontent/AssignTaskContent';
import TaskActionModal from '../../components/taskactionmodal/TaskActionModal';
import { useTasks } from '../../hooks/useTasks';
import { useRecurringTasks } from '../../hooks/useRecurringTasks';
import InboxFilters from './InboxFilters';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));


function Inbox() {
  const {
    tasks,
    isLoading,
    error,
    newTask,
    setNewTask,
    activeModal,
    selectedTask,
    datePickerPosition,
    datePickerType,
    handleActionClick,
    closeModal,
    handleAssign,
    handleDateChange,
    handleDatePickerOpen,
    handleDatePickerClose,
    isDatePickerOpen,
    handleAddTask,
    fetchProjects
  } = useTasks();

  const { handleAddRecurringTask } = useRecurringTasks();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [filters, setFilters] = useState(['all']);
  const [title, setName] = useState('');
  const [description, setDescription] = useState('');

  const toggleFilter = (filter) => {
    setFilters(prevFilters => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(f => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const taskList = useMemo(() => (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onActionClick={handleActionClick}
          onDatePickerOpen={handleDatePickerOpen}
        />
      ))}
    </List>
  ), [tasks, handleActionClick, handleDatePickerOpen]);

  const renderModalContent = useMemo(() => {
    switch (activeModal) {
      case 'addToProject':
        fetchProjects();
        return <AddToProjectContent task={selectedTask} onClose={closeModal} />;
      case 'assign':
        return <AssignTaskContent task={selectedTask} onClose={closeModal} onAssign={handleAssign} />;
      case 'setDeadline':
        return <Typography variant="h6">Set Deadline</Typography>;
      case 'setRecurring':
        return <RecurringTaskForm onClose={closeModal} onSubmit={handleAddRecurringTask} />;
      case 'edit':
        return <Typography variant="h6">Edit Task</Typography>;
      default:
        return null;
    }
  }, [activeModal, selectedTask, closeModal, handleAssign, fetchProjects]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: 100,
          height: 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h1" gutterBottom>Inbox</Typography>
      <StyledPaper>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              handleAddTask(newTask);
              setNewTask('');
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => {
                handleAddTask(newTask);
                setNewTask();
              }}>
                <AddIcon />
              </IconButton>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <InboxFilters filters={filters} toggleFilter={toggleFilter} />
        {taskList}
      </StyledPaper>
      
      <TaskActionModal isOpen={!!activeModal} onClose={closeModal}>
        {renderModalContent}
      </TaskActionModal>
      
      <Modal
        open={isDatePickerOpen}
        onClose={handleDatePickerClose}
        aria-labelledby="date-picker-modal"
        aria-describedby="modal-to-select-date"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
        }}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default React.memo(Inbox);
