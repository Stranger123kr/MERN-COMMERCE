import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateOrder,
  fetchAllOrders,
  OrderWithPayment,
  UpdateOrder,
} from "./OrderAPI";

const initialState = {
  orders: [],
  status: true,
  error: null,
  currentOrder: null,
  UserPaymentInfo: null,
  adminCheck: false,
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

export const OrderWithPaymentAsync = createAsyncThunk(
  "fetch/OrderWithPayment",
  async () => {
    const response = await OrderWithPayment();
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
        state.adminCheck = true;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
        state.adminCheck = true;
      })

      // =======================================================

      .addCase(OrderWithPaymentAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(OrderWithPaymentAsync.fulfilled, (state, action) => {
        state.status = false;
        state.UserPaymentInfo = action.payload;
        // state.adminCheck = true;
      })
      .addCase(OrderWithPaymentAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
        // state.adminCheck = true;
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
export const selectAdminCheck = (state) => state.order.adminCheck;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectUserPaymentInfo = (state) => state.order.UserPaymentInfo;
export const selectOrdersStatus = (state) => state.order.status;

export default OrderSlice.reducer;
