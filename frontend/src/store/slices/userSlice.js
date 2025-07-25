import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (roleFilter = null, { rejectWithValue }) => {
    try {
      const endpoint = roleFilter && roleFilter !== 'all'
        ? `${API_URL}/api/users?role=${roleFilter}`
        : `${API_URL}/api/users`;
        
      const response = await axios.get(endpoint);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/users`, userData);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        return rejectWithValue({
          validationErrors: error.response.data.errors,
          message: 'Validation failed'
        });
      }
      return rejectWithValue('Failed to create user');
    }
  }
);

const initialState = {
  users: [],
  availableRoles: [],
  selectedRole: 'all',
  isLoading: false,
  createUserLoading: false,
  error: null,
  validationErrors: {},
  successCreating: false
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
      state.validationErrors = {};
    },
    resetSuccessCreating: (state) => {
      state.successCreating = false;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        
        const allRoles = new Set();
        state.users.forEach(user => {
          if (user.roles && user.roles.length > 0) {
            user.roles.forEach(role => {
              allRoles.add(role.name);
            });
          }
        });
        state.availableRoles = Array.from(allRoles);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      
      .addCase(createUser.pending, (state) => {
        state.createUserLoading = true;
        state.error = null;
        state.validationErrors = {};
        state.successMessage = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserLoading = false;
        state.successCreating = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserLoading = false;
        
        if (action.payload && action.payload.validationErrors) {
          state.validationErrors = action.payload.validationErrors;
          state.error = action.payload.message;
        } else {
          state.error = action.payload || 'Failed to create user';
        }
      });
  }
});

export const { setSelectedRole, clearErrors, resetSuccessCreating } = userSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const selectAvailableRoles = (state) => state.users.availableRoles;
export const selectSelectedRole = (state) => state.users.selectedRole;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectCreateUserLoading = (state) => state.users.createUserLoading;
export const selectError = (state) => state.users.error;
export const selectValidationErrors = (state) => state.users.validationErrors;
export const selectSuccessCreating = (state) => state.users.successCreating;

export default userSlice.reducer;
