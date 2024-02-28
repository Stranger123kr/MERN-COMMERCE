import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateOrder, fetchAllOrders, UpdateOrder } from "./OrderAPI";

const initialState = {
  orders: [],
  status: true,
  error: null,
  currentOrder: null,
  totalOrders: 0,
};

// ===========================================================

// We need more information about order

export const CreateOrderAsync = createAsyncThunk(
  "create/CreateOrder",
  async (order) => {
    const response = await CreateOrder(order);
    return response.data;
  }
);

// ===========================================================

export const fetchAllOrdersAsync = createAsyncThunk(
  "fetch/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);

// ===========================================================

export const UpdateOrderAsync = createAsyncThunk(
  "update/UpdateOrder",
  async (order) => {
    const response = await UpdateOrder(order);
    return response.data;
  }
);

// ===========================================================

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
      })

      // =======================================================

      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // =======================================================

      .addCase(UpdateOrderAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(UpdateOrderAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );

        state.orders[index] = action.payload;
      })
      .addCase(UpdateOrderAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      });

    // =======================================================
  },
});

export const { ResetOrder } = OrderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrder = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default OrderSlice.reducer;
