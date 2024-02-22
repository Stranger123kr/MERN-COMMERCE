import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUser, CheckUser, UserSignOut } from "./AuthAPI";
import { UpdateUser } from "../User/UserAPI";
const initialState = {
  loggedInUser: null,
  status: true,
  error: null,
};

// ======================================================================

export const CreateUserAsync = createAsyncThunk(
  "users/CreateUser",
  async (UserData) => {
    const response = await CreateUser(UserData);
    return response.data;
  }
);

// ======================================================================

export const CheckUserAsync = createAsyncThunk(
  "users/CheckUser",
  async (loginInfo) => {
    const response = await CheckUser(loginInfo);
    return response.data;
  }
);

// ======================================================================

export const UserSignOutAsync = createAsyncThunk(
  "users/UserSignOut",
  async (userId) => {
    const response = await UserSignOut(userId);
    return response.data;
  }
);

// ======================================================================

export const UpdateUserAsync = createAsyncThunk(
  "users/UpdateUser",
  async (update) => {
    const response = await UpdateUser(update);
    return response.data;
  }
);

// ======================================================================

export const AuthSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.loggedInUser = action.payload;
      })
      .addCase(CreateUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(CheckUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(CheckUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.loggedInUser = action.payload;
      })
      .addCase(CheckUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = false;

        state.loggedInUser = action.payload;
      })
      .addCase(UpdateUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(UserSignOutAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(UserSignOutAsync.fulfilled, (state, action) => {
        state.status = false;

        state.loggedInUser = null;
      })
      .addCase(UserSignOutAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      });
  },
});

// export const { increment } = counterSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default AuthSlice.reducer;
