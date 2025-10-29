import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../services/projectService';
import { RootState } from './store';

const initialState = {
  projects: [],
  project: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all projects
export const getProjects = createAsyncThunk(
  'projects/getAll',
  async (_, thunkAPI) => {
    try {
      return await projectService.getProjects();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single project
export const getProject = createAsyncThunk(
  'projects/get',
  async (projectId: string, thunkAPI) => {
    try {
      return await projectService.getProject(projectId);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RSVP for a project
export const rsvpProject = createAsyncThunk(
  'projects/rsvp',
  async (projectId: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await projectService.rsvpProject(projectId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new project
export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData: any, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await projectService.createProject(projectData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete project
export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (projectId: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await projectService.deleteProject(projectId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(rsvpProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rsvpProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(rsvpProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload.id
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
