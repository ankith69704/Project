import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from './paymentService';
import { RootState } from './store';

const initialState = {
  order: null,
  payments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new payment order
export const createOrder = createAsyncThunk(
  'payments/createOrder',
  async (orderData: any, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await paymentService.createOrder(orderData, token);
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

// Get my payments
export const getMyPayments = createAsyncThunk(
  'payments/getMyPayments',
  async (_, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await paymentService.getMyPayments(token);
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

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getMyPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payments = action.payload;
      })
      .addCase(getMyPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer;
