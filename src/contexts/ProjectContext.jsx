import React, { createContext, useContext, useState, useCallback } from 'react';
import projectsApi from '../api/projectsApi';
import { indexedDbManager } from '../utils/indexedDB'

const ProjectContext = createContext();

const projectsDBManager = indexedDbManager('projects');

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  const fetchProjects = useCallback(async (forceRefresh=false) => {
    if(!forceRefresh) {
      const cachedProjects = await projectsDBManager.getAllRecords();
      if(cachedProjects.length > 0) {
        setProjects(cachedProjects);
        console.log(`CACHED PROJECTS: ${JSON.stringify(cachedProjects)}`)
        return cachedProjects;
      }
    }

    try {
      const response = await projectsApi.getAllProjects();
      setProjects(response.data)
      await projectsDBManager.clearRecords();
      await Promise.all(response.data.map(project => {
        console.log(`Project: ${project}`)
        projectsDBManager.addRecord(project)
      }));
      return response.data;
    } catch(error) {
      console.error(`Error fetching projects: ${error}`)
      throw error
    } 
  }, []);

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
