import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FetchAllProducts,
  FetchProductsByFilter,
  FetchCategories,
  FetchBrands,
} from "./ProductsAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  totalPages: 0,
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
  async ({ filter, sort, pagination }) => {
    const response = await FetchProductsByFilter(filter, sort, pagination);
    return response.data;
  }
);

// ======================================================================

export const FetchCategoriesAsync = createAsyncThunk(
  "category/FetchCategories",
  async () => {
    const response = await FetchCategories();
    return response.data;
  }
);

// ======================================================================

export const FetchBrandsAsync = createAsyncThunk(
  "brands/FetchBrands",
  async () => {
    const response = await FetchBrands();
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
        state.status = true;
      })
      .addCase(FetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.status = false;
      })
      .addCase(FetchProductsByFilterAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = false;
      })

      // ======================================================

      .addCase(FetchCategoriesAsync.pending, (state, action) => {
        // state.status = true;
      })
      .addCase(FetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        // state.status = false;
      })
      .addCase(FetchCategoriesAsync.rejected, (state, action) => {
        state.error = action.payload;
        // state.status = false;
      })

      // ======================================================

      .addCase(FetchBrandsAsync.pending, (state, action) => {
        // state.status = true;
      })
      .addCase(FetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        // state.status = false;
      })
      .addCase(FetchBrandsAsync.rejected, (state, action) => {
        state.error = action.payload;
        // state.status = false;
      });
  },
});

// export const {} = ProductsSlice.actions;

export const selectProducts = (state) => state.product;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectTotalProductsPage = (state) => state.product.totalPages;

export default ProductsSlice.reducer;
