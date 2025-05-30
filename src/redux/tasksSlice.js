import { createSlice } from '@reduxjs/toolkit';

const loadTasks = () => {
  if (typeof window !== 'undefined') {
    try {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const saveTasks = (tasks) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

const initialState = {
  tasks: loadTasks(),
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
