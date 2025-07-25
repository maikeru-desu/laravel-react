import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
