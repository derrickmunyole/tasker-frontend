import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import './Inbox.css';
import TaskItem from '../../components/taskitem/TaskItem';
import { useTasks } from '../../contexts/TaskContext';
import LoadingIndicator from '../../components/loadingcomponent/LoadingWidget';
import TaskActionModal from '../../components/taskactionmodal/TaskActionModal';
import { ProjectProvider, useProjects } from '../../contexts/ProjectContext'
import AddToProjectContent from '../../components/addtoprojectcontent/AddToProjectContent';
import AssignTaskContent from '../../components/assigntaskcontent/AssignTaskContent';


function Inbox() {
  const [newTask, setNewTask] = useState('');
  const { tasks, fetchTasks } = useTasks();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const { fetchProjects } = useProjects();
  const [datePickerPosition, setDatePickerPosition] = useState({ top: 0, left: 0 });
  const [datePickerType, setDatePickerType] = useState(null);


  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchTasks();
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setIsLoading(false);
    }
  }, [fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleActionClick = useCallback((actionType, task) => {
    setActiveModal(actionType);
    setSelectedTask(task);
  }, []);

  const handleDatePickerOpen = useCallback((event, type, taskId) => {
    const rect = event.target.getBoundingClientRect();
    setDatePickerPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setDatePickerType(type);
    setSelectedTask(tasks.find(task => task.id === taskId));
  }, [tasks])

  const handleDateChange = (date) => {
    if (datePickerType === 'dueDate') {
      handleSetDueDate(date);
    } else if (datePickerType === 'reminder') {
      handleSetReminder(date);
    }
    setDatePickerType(null);
  };

  const handleSetDueDate = (date) => {
    console.log(`Setting due date for task ${selectedTask.id} to ${date}`);
    // Update the task's due date in your state or send to backend
  };

  const handleSetReminder = (date) => {
    console.log(`Setting reminder for task ${selectedTask.id} to ${date}`);
    // Update the task's reminder in your state or send to backend
  };

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedTask(null);
  }, []);

  const handleAssign = useCallback((user) => {
    console.log(`Assigning task ${selectedTask.id} to user:`, user);
    closeModal();
  }, [selectedTask, closeModal]);

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
        return <h2>Set Recurring</h2>;
      case 'edit':
        return <h2>Edit Task</h2>;
      default:
        return null;
    }
  }, [activeModal]);

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
        {/* Add your form or content for the specific action */}
        {/* You can use the selectedTask state to access the task data */}
      </TaskActionModal>
      {datePickerType && (
        <div style={{
          position: 'absolute',
          top: `${datePickerPosition.top}px`,
          left: `${datePickerPosition.left}px`,
          zIndex: 1000,
        }}>
          <DatePicker
            selected={selectedTask[datePickerType === 'dueDate' ? 'dueDate' : 'reminder']}
            onChange={handleDateChange}
            onClickOutside={() => setDatePickerType(null)}
            inline
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(Inbox);
