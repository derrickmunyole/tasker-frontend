import { useState, useEffect, useCallback } from 'react';
import { useTasksContext } from '../contexts/TaskContext';
import { useProjects } from '../contexts/ProjectContext';

export const useTasks = () => {
  const { tasks, fetchTasks } = useTasksContext();
  const { fetchProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
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

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedTask(null);
  }, []);

  const handleAssign = useCallback((user) => {
    console.log(`Assigning task ${selectedTask.id} to user:`, user);
    closeModal();
  }, [selectedTask, closeModal]);

  const handleSetDueDate = useCallback((date) => {
    console.log(`Setting due date for task ${selectedTask.id} to ${date}`);
    // Update the task's due date in your state or send to backend
  }, [selectedTask]);

  const handleSetReminder = useCallback((date) => {
    console.log(`Setting reminder for task ${selectedTask.id} to ${date}`);
    // Update the task's reminder in your state or send to backend
  }, [selectedTask]);

  const handleDateChange = useCallback((date) => {
    if (datePickerType === 'dueDate') {
      handleSetDueDate(date);
    } else if (datePickerType === 'reminder') {
      handleSetReminder(date);
    }
    setDatePickerType(null);
  }, [datePickerType, handleSetDueDate, handleSetReminder]);

  const handleDatePickerOpen = (event, type, taskId) => {
    event.stopPropagation(); // Prevent event bubbling
    setDatePickerType(type);
    setSelectedTaskId(taskId);
    setIsDatePickerOpen(true);
};


  const handleDatePickerClose = useCallback(() => {
    setIsDatePickerOpen(false);
    setDatePickerType(null);
    setSelectedTask(null);
  }, []);

  const handleAddTask = useCallback(() => {
    // Implement add task logic here
    console.log('Adding new task:', newTask);
    setNewTask('');
  }, [newTask]);

  return {
    tasks,
    isLoading,
    error,
    newTask,
    setNewTask,
    activeModal,
    selectedTask,
    datePickerPosition,
    datePickerType,
    loadTasks,
    handleActionClick,
    closeModal,
    handleAssign,
    handleSetDueDate,
    handleSetReminder,
    handleDateChange,
    handleDatePickerOpen,
    handleDatePickerClose,
    isDatePickerOpen,
    handleAddTask,
    fetchProjects
  };
};
