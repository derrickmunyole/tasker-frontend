import { get, post, put, remove } from './ApiClient';

const TASKS_ENDPOINT = '/tasks/';

const taskApi = {
  // Get all tasks
  getAllTasks: () => get(TASKS_ENDPOINT),

  // Create a new task
  createTask: (taskData) => post(TASKS_ENDPOINT, taskData),

  // Update a task
  updateTask: (taskId, taskData) => put(`${TASKS_ENDPOINT}update/${taskId}`, taskData),

  // Delete a task
  deleteTask: (taskId) => remove(`${TASKS_ENDPOINT}delete/${taskId}`),

  // Assign tags to a task
  assignTags: (taskId, tagIds) => post(`${TASKS_ENDPOINT}${taskId}/tags`, { tag_ids: tagIds }),

  // Assign a task to a project
  assignToProject: (taskId, projectId) => post(`${TASKS_ENDPOINT}${taskId}/assign`, { project_id: projectId }),

  // Add a comment to a task
  addComment: (taskId, content) => post(`${TASKS_ENDPOINT}${taskId}/comment`, { content }),

  // Assign a task to a user
  assignToUser: (taskId, userId) => post(`${TASKS_ENDPOINT}${taskId}/assign_user`, { user_id: userId }),
};

export default taskApi;
