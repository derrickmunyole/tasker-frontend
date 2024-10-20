import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import taskApi from '../api/tasksAPi';
import { indexedDbManager } from '../utils/indexedDB';
import { fetchFunctionFactory } from '../utils/fetchUtils';

const TasksContext = createContext();

const tasksDBManager = indexedDbManager('tasks');

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const fetchTasks = fetchFunctionFactory(
    taskApi.getAllTasks,
    tasksDBManager,
    setTasks,
    setIsLoading,
    setError
  )

  const addTask = useCallback(async (newTaskData) => {
    try {
      const response = await taskApi.createTask(newTaskData);
      setTasks(prevTasks => [...prevTasks, response.data.task]);
      return response.data.task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (taskId, updatedTaskData) => {
    try {
      const response = await taskApi.updateTask(taskId, updatedTaskData);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? response.data.task : task));
      return response.data.task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskApi.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }, []);

  const assignTags = useCallback(async (taskId, tagIds) => {
    try {
      const response = await taskApi.assignTags(taskId, tagIds);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, tags: response.data.tags } : task));
      return response.data;
    } catch (error) {
      console.error('Error assigning tags:', error);
      throw error;
    }
  }, []);

  const assignToProject = useCallback(async (taskId, projectId) => {
    try {
      const response = await taskApi.assignToProject(taskId, projectId);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, project: response.data.project } : task));
      return response.data;
    } catch (error) {
      console.error('Error assigning task to project:', error);
      throw error;
    }
  }, []);

  const addComment = useCallback(async (taskId, content) => {
    try {
      const response = await taskApi.addComment(taskId, content);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, comments: [...task.comments, response.data.comment] } : task));
      return response.data.comment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }, []);

  const assignToUser = useCallback(async (taskId, userId) => {
    try {
      const response = await taskApi.assignToUser(taskId, userId);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, assignedUser: response.data.user } : task));
      return response.data;
    } catch (error) {
      console.error('Error assigning task to user:', error);
      throw error;
    }
  }, []);

  const contextValue = useMemo(() => ({
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    assignTags,
    assignToProject,
    addComment,
    assignToUser
  }), [tasks, isLoading, error, fetchTasks, addTask, updateTask, deleteTask, assignTags, assignToProject, addComment, assignToUser]);

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TaskContextProvider');
  }
  return context;
};
