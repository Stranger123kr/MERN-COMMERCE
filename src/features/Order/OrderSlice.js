import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateOrder } from "./OrderAPI";

const initialState = {
  orders: [],
  status: true,
  error: null,
  currentOrder: null,
};
// We need more information about order

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
    ResetOrder: (state) => {
      state.currentOrder = null;
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
        state.currentOrder = action.payload;
      })
      .addCase(CreateOrderAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      });
  },
});

export const { ResetOrder } = OrderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;

export default OrderSlice.reducer;
