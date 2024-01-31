import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./AuthAPI";

const initialState = {
  value: 0,
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { increment } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
