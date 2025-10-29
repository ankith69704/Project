import axios from 'axios';

const API_URL = '/api/v1/projects/';

// Get all projects
const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single project
const getProject = async (projectId: string) => {
  const response = await axios.get(API_URL + projectId);
  return response.data;
};

// RSVP for a project
const rsvpProject = async (projectId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + projectId + '/rsvp', {}, config);
  return response.data;
};

// Create new project
const createProject = async (projectData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

// Delete project
const deleteProject = async (projectId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + projectId, config);
  return response.data;
};

const projectService = {
  getProjects,
  getProject,
  rsvpProject,
  createProject,
  deleteProject,
};

export default projectService;
