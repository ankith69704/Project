import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import paymentReducer from './paymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    payments: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
