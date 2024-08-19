import { useState, useCallback } from 'react';
import { useTasksContext } from '../contexts/TaskContext';

export const useRecurringTasks = () => {
  const { tasks, updateTask } = useTasksContext();
  const [recurringTasks, setRecurringTasks] = useState([]);

  const handleAddRecurringTask = useCallback((taskDetails) => {
    console.log('Adding new recurring task:', taskDetails);
    // API call to add recurring task
    setRecurringTasks(prevTasks => [...prevTasks, taskDetails]);
  }, []);

  const handleUpdateRecurringTask = useCallback((taskId, updatedDetails) => {
    console.log('Updating recurring task:', taskId, updatedDetails);
    // API call to update recurring task
    setRecurringTasks(prevTasks => 
      prevTasks.map(task => task.id === taskId ? {...task, ...updatedDetails} : task)
    );
  }, []);

  const handleDeleteRecurringTask = useCallback((taskId) => {
    console.log('Deleting recurring task:', taskId);
    // API call to delete recurring task
    setRecurringTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const generateNextOccurrence = useCallback((task) => {
    console.log('Generating next occurrence for task:', task.id);
    // Logic to calculate the next occurrence based on the recurrence pattern
  }, []);

  const handleCompleteRecurringTask = useCallback((taskId) => {
    console.log('Completing recurring task:', taskId);
    const task = recurringTasks.find(t => t.id === taskId);
    if (task) {
      const nextOccurrence = generateNextOccurrence(task);
      console.log('Next occurrence:', nextOccurrence);
      // API call to update task with new occurrence date
      updateTask(taskId, { nextOccurrence });
    }
  }, [recurringTasks, generateNextOccurrence, updateTask]);

  return {
    recurringTasks,
    handleAddRecurringTask,
    handleUpdateRecurringTask,
    handleDeleteRecurringTask,
    handleCompleteRecurringTask,
  };
};
