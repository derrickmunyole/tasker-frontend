import React, { useMemo, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Modal, Box } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css"
import './Inbox.css';
import TaskItem from '../../components/taskitem/TaskItem';
import LoadingIndicator from '../../components/loadingcomponent/LoadingWidget';
import RecurringTaskForm from '../../components/recurringtaskform/RecurringTaskForm';
import AddToProjectContent from '../../components/addtoprojectcontent/AddToProjectContent';
import AssignTaskContent from '../../components/assigntaskcontent/AssignTaskContent';
import TaskActionModal from '../../components/taskactionmodal/TaskActionModal';
import { useTasks } from '../../hooks/useTasks';
import { useRecurringTasks } from '../../hooks/useRecurringTasks';


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

  const taskList = useMemo(() => (
    <div className='task-list'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onActionClick={handleActionClick}
          onDatePickerOpen={handleDatePickerOpen}
        />
      ))}
    </div>
  ), [tasks, handleActionClick, handleDatePickerOpen]);

  

  const renderModalContent = useMemo(() => {
    switch (activeModal) {
      case 'addToProject':
        fetchProjects();
        return <AddToProjectContent task={selectedTask} onClose={closeModal} />;
      case 'assign':
        return <AssignTaskContent task={selectedTask} onClose={closeModal} onAssign={handleAssign} />;
      case 'setDeadline':
        return <h2>Set Deadline</h2>;
      case 'setRecurring':
        return <RecurringTaskForm onClose={closeModal} onSubmit={handleAddRecurringTask} />;
      case 'edit':
        return <h2>Edit Task</h2>;
      default:
        return null;
    }
  }, [activeModal, selectedTask, closeModal, handleAssign, fetchProjects]);

  if (isLoading) {
    return (
      <div
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <LoadingIndicator />
      </div>
    );
  }
  if (error) return <div>{error}</div>;


  return (
    <div className='inbox-container'>
      <h3>Inbox</h3>
      <div className='add-task-container'>
        <input
          type='text'
          className='add-task-input'
          placeholder='Add a new task...'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
      </div>
      {taskList}
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
    </div>
  );
}

export default React.memo(Inbox);
