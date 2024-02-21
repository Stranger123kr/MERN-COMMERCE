import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUser,
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
} from "./UserAPI";

const initialState = {
  userInfo: [], // this info will be used in case of details user info, while auth will
  // only be used for loggedIn user id etc checks
  userOrders: [],
  status: true,
  error: null,
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);

// ==================================================================

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "userOrders/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

// ==================================================================

export const UpdateUserAsync = createAsyncThunk(
  "user/UpdateUser",
  async (userId) => {
    const response = await UpdateUser(userId);
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
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // ================================================================

      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = false;
        // this info is to much bigger of loggedIn user
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
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
export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
