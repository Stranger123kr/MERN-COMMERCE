import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAllProducts, FetchProductsByFilter } from "./ProductsAPI";

const initialState = {
  products: [],
  status: true,
  error: null,
};

// ======================================================================

export const FetchAllProductsAsync = createAsyncThunk(
  "Products/FetchAllProducts",
  async () => {
    const response = await FetchAllProducts();
    return response.data;
  }
);

// ======================================================================

export const FetchProductsByFilterAsync = createAsyncThunk(
  "filter/FetchProductsByFilter",
  async (filter) => {
    const response = await FetchProductsByFilter(filter);
    return response.data;
  }
);

// ======================================================================

export const ProductsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(FetchAllProductsAsync.pending, (state) => {
        state.status = true;
      })

      .addCase(FetchAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = false;
      })

      .addCase(FetchAllProductsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = false;
      })

      // ======================================================

      .addCase(FetchProductsByFilterAsync.pending, (state, action) => {
        // state.status = true;
      })
      .addCase(FetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        // state.status = false;
      })
      .addCase(FetchProductsByFilterAsync.rejected, (state, action) => {
        state.error = action.payload;
        // state.status = false;
      });
  },
});

// export const {} = ProductsSlice.actions;

export const selectProducts = (state) => state.product;

export default ProductsSlice.reducer;
