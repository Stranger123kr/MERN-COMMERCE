import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FetchProductsByFilter,
  FetchCategories,
  FetchBrands,
  FetchProductsById,
  CreateProducts,
  UpdateProducts,
  DeleteProducts,
} from "./ProductsAPI";

const initialState = {
  products: [],
  productsById: [],
  categories: [],
  brands: [],
  totalPages: 0,
  status: true,
  error: null,
};

// ======================================================================

export const FetchProductsByFilterAsync = createAsyncThunk(
  "filter/FetchProductsByFilter",
  async ({ search, filter, sort, pagination }) => {
    const response = await FetchProductsByFilter(
      search,
      filter,
      sort,
      pagination
    );
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

export const FetchProductsByIdAsync = createAsyncThunk(
  "ProductsById/FetchProductsById",
  async (id) => {
    const response = await FetchProductsById(id);
    return response.data;
  }
);

// ======================================================================

export const CreateProductsAsync = createAsyncThunk(
  "Products/CreateProducts",
  async (ProductData) => {
    const response = await CreateProducts(ProductData);
    return response.data;
  }
);

// ======================================================================

export const UpdateProductsAsync = createAsyncThunk(
  "Products/UpdateProducts",
  async (productInfo) => {
    const response = await UpdateProducts(productInfo);
    return response.data;
  }
);

// ======================================================================

export const DeleteProductsAsync = createAsyncThunk(
  "Products/DeleteProducts",
  async (id) => {
    const response = await DeleteProducts(id);
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

      .addCase(FetchProductsByFilterAsync.pending, (state, action) => {
        state.status = true;
      })
      .addCase(FetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.status = false;
      })
      .addCase(FetchProductsByFilterAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      })

      // ======================================================

      .addCase(FetchCategoriesAsync.pending, (state, action) => {
        state.status = true;
      })
      .addCase(FetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = false;
      })
      .addCase(FetchCategoriesAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      })

      // ======================================================

      .addCase(FetchBrandsAsync.pending, (state, action) => {
        state.status = true;
      })
      .addCase(FetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = false;
      })
      .addCase(FetchBrandsAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      })

      // ======================================================

      .addCase(FetchProductsByIdAsync.pending, (state, action) => {
        state.status = true;
      })
      .addCase(FetchProductsByIdAsync.fulfilled, (state, action) => {
        state.productsById = action.payload;
        state.status = false;
      })
      .addCase(FetchProductsByIdAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      })

      // ======================================================

      .addCase(CreateProductsAsync.pending, (state, action) => {
        state.status = true;
      })
      .addCase(CreateProductsAsync.fulfilled, (state, action) => {
        state.status = false;
        state.products.push(action.payload);
      })
      .addCase(CreateProductsAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      })

      // ======================================================

      .addCase(UpdateProductsAsync.pending, (state, action) => {
        state.status = true;
      })
      .addCase(UpdateProductsAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.status = false;
      })
      .addCase(UpdateProductsAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      })

      // ======================================================

      .addCase(DeleteProductsAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(DeleteProductsAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products.splice(index, 1);
        state.status = false;
      })
      .addCase(DeleteProductsAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = false;
      });
  },
});

// export const {} = ProductsSlice.actions;+

export const selectProducts = (state) => state.product;
export const selectTotalProductsPage = (state) => state.product.totalPages;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProductsById = (state) => state.product.productsById;
export const selectStatus = (state) => state.product.status;

export default ProductsSlice.reducer;
