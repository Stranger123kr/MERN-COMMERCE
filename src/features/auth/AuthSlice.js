import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateUser,
  loginUser,
  CheckAuth,
  ResetPasswordRequest,
  ResetPassword,
  UserSignOut,
} from "./AuthAPI";
const initialState = {
  loggedInUserToken: null,
  status: true,
  LoginStatus: false,
  error: null,
  userCheck: false,
  mailSend: false,
  passwordReset: false,
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

export const loginUserAsync = createAsyncThunk(
  "users/CheckUser",
  async (loginInfo) => {
    const response = await loginUser(loginInfo);
    return response.data;
  }
);

// ======================================================================

export const CheckAuthAsync = createAsyncThunk("users/CheckAuth", async () => {
  const response = await CheckAuth();
  return response.data;
});

// ======================================================================

export const ResetPasswordRequestAsync = createAsyncThunk(
  "users/ResetPasswordRequest",
  async (email) => {
    const response = await ResetPasswordRequest(email);
    return response.data;
  }
);

// ======================================================================

export const ResetPasswordAsync = createAsyncThunk(
  "users/ResetPassword",
  async (UserInfo) => {
    const response = await ResetPassword(UserInfo);
    return response.data;
  }
);

// ======================================================================

export const UserSignOutAsync = createAsyncThunk(
  "users/UserSignOut",
  async () => {
    const response = await UserSignOut();
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(CreateUserAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(loginUserAsync.pending, (state) => {
        state.status = true;
        state.LoginStatus = false;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = false;
        state.LoginStatus = false;
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = false;
        state.LoginStatus = true;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(UserSignOutAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(UserSignOutAsync.fulfilled, (state, action) => {
        state.status = false;
        state.loggedInUserToken = null;
      })
      .addCase(UserSignOutAsync.rejected, (state, action) => {
        state.status = false;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(CheckAuthAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(CheckAuthAsync.fulfilled, (state, action) => {
        state.status = false;
        state.loggedInUserToken = action.payload;
        state.userCheck = true;
      })
      .addCase(CheckAuthAsync.rejected, (state, action) => {
        state.status = false;
        state.userCheck = true;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(ResetPasswordRequestAsync.pending, (state) => {
        state.status = true;
        state.mailSend = false;
      })
      .addCase(ResetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = false;
        state.mailSend = true;
      })
      .addCase(ResetPasswordRequestAsync.rejected, (state, action) => {
        state.status = false;
        state.mailSend = false;
        state.error = action.error;
      })

      // ======================================================================

      .addCase(ResetPasswordAsync.pending, (state) => {
        state.status = true;
        state.passwordReset = false;
      })
      .addCase(ResetPasswordAsync.fulfilled, (state, action) => {
        state.status = false;
        state.passwordReset = true;
      })
      .addCase(ResetPasswordAsync.rejected, (state, action) => {
        state.status = false;
        state.passwordReset = true;
        state.error = action.error;
      });
  },
});

// export const { increment } = counterSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectUserCheck = (state) => state.auth.userCheck;
export const selectError = (state) => state.auth.error;
export const selectMailStatus = (state) => state.auth.mailSend;
export const selectStatus = (state) => state.auth.status;
export const selectLoginStatus = (state) => state.auth.LoginStatus;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default AuthSlice.reducer;
