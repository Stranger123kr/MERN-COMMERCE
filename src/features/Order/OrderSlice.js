import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateOrder } from "./OrderAPI";

const initialState = {
  orders: [],
  status: true,
  error: null,
};

export const CreateOrderAsync = createAsyncThunk(
  "create/CreateOrder",
  async (order) => {
    const response = await CreateOrder(order);
    return response.data;
  }
);

export const OrderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateOrderAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(CreateOrderAsync.fulfilled, (state, action) => {
        state.status = false;
        state.orders.push(action.payload);
      })
      .addCase(CreateOrderAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      });
  },
});

// export const selectCount = (state) => state.counter.value;

export default OrderSlice.reducer;
