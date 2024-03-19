import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUser,
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
} from "./UserAPI";

const initialState = {
  userInfo: [], // this info will be used in case of details user info, while auth will
  // this info will be used in case of details user info, while auth will
  // only be used for loggedIn user id etc checks
  orders: [],
  status: true,
  userCheck: false,
  error: null,
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

// ==================================================================

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "userOrders/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);

// ==================================================================

export const UpdateUserAsync = createAsyncThunk(
  "user/UpdateUser",
  async (update) => {
    const response = await UpdateUser(update);
    return response.data;
  }
);

// ==================================================================

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = false;
        // this info is to much bigger of loggedIn user
        state.userInfo = action.payload;
        state.userCheck = true;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
        state.userCheck = true;
      })

      // ================================================================

      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = false;
        // this info is to much bigger of loggedIn user
        state.orders = action.payload;
        state.userCheck = true;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
        state.userCheck = true;
      })

      // ================================================================

      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.userInfo = action.payload;
      })
      .addCase(UpdateUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      });

    // ================================================================
  },
});

// export const { increment } = counterSlice.actions;

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserCheck = (state) => state.user.userCheck;
export const selectUserOrders = (state) => state.user.orders;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
