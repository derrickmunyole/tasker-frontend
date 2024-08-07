import { get, post, put, remove } from './apiClient';

const PROJECTS_ENDPOINT = '/projects';

export const projectsApi = {
  // Get all projects
  getAllProjects: () => {
    return get(PROJECTS_ENDPOINT);
  },

  // Get a single project by ID
  getProject: (projectId) => {
    return get(`${PROJECTS_ENDPOINT}/${projectId}`);
  },

  // Create a new project
  createProject: (projectData) => {
    return post(PROJECTS_ENDPOINT, projectData);
  },

  // Update an existing project
  updateProject: (projectId, projectData) => {
    return put(`${PROJECTS_ENDPOINT}/${projectId}`, projectData);
  },

  // Delete a project
  deleteProject: (projectId) => {
    return remove(`${PROJECTS_ENDPOINT}/${projectId}`);
  }
};

export default projectsApi;
