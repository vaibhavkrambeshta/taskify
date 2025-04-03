import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/tasks';

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filters = {}) => {
    try {
      console.log("filters===", filters);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}?${queryParams}`);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
);
// Add a new task
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedTask }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    selectedTask: null,  
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;