import { configureStore } from '@reduxjs/toolkit';
import campersReducer from '../store/slices/campersSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});