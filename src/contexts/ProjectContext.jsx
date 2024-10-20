import React, { createContext, useContext, useState, useCallback } from 'react';
import projectsApi from '../api/projectsApi';
import { indexedDbManager } from '../utils/indexedDB'
import { fetchFunctionFactory } from '../utils/fetchUtils';

const ProjectContext = createContext();

const projectsDBManager = indexedDbManager('projects');

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProjects =  fetchFunctionFactory(
    projectsApi.getAllProjects,
    projectsDBManager,
    setProjects,
    setIsLoading,
    setError
  )

  const createProject = useCallback(async (projectData) => {
    try {
      const response = await projectsApi.createProject(projectData);
      setProjects(prevProjects => [...prevProjects, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }, []);

  const fetchProjectById = useCallback(async (projectId) => {
    try {
      const response = await projectsApi.getProject(projectId);
      console.log('Fetched project:', response.data);
      setCurrentProject(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      setCurrentProject(null);
    }
  }, []);

  // Add other methods like updateProject, deleteProject, etc.

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        fetchProjects,
        createProject,
        fetchProjectById
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
