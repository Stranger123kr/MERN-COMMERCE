import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  fetchCartByUserId,
  UpdateCart,
  DeleteCartItem,
} from "./CartAPI";

// ============================================================================

const initialState = {
  carts: [],
  status: true,
  error: null,
};

// ============================================================================

export const AddToCartAsync = createAsyncThunk(
  "cart/AddToCart",
  async (CartInfo) => {
    const response = await AddToCart(CartInfo);
    return response.data;
  }
);

// ============================================================================

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (UserId) => {
    const response = await fetchCartByUserId(UserId);
    return response.data;
  }
);

// ============================================================================

export const UpdateCartAsync = createAsyncThunk(
  "cart/UpdateCart",
  async (update) => {
    const response = await UpdateCart(update);
    return response.data;
  }
);

// ============================================================================

export const DeleteCartItemAsync = createAsyncThunk(
  "cart/DeleteCartItem",
  async (itemId) => {
    const response = await DeleteCartItem(itemId);
    return response.data;
  }
);

// ============================================================================

export const CartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddToCartAsync.pending, (state) => {
        // state.status = true;
      })
      .addCase(AddToCartAsync.fulfilled, (state, action) => {
        // state.status = true;
        state.carts.push(action.payload);
      })
      .addCase(AddToCartAsync.rejected, (state, action) => {
        // state.status = true;
        state.error = action.error;
      })

      // ===================================================

      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        // state.status = true;
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        // state.status = true;
        state.carts = action.payload;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        // state.status = true;
        state.error = action.error;
      })

      // ===================================================

      .addCase(UpdateCartAsync.pending, (state) => {
        // state.status = true;
      })
      .addCase(UpdateCartAsync.fulfilled, (state, action) => {
        // state.status = true;
        const index = state.carts.findIndex(
          (item) => item.id === action.payload.id
        );

        state.carts[index] = action.payload;
      })
      .addCase(UpdateCartAsync.rejected, (state, action) => {
        // state.status = true;
        state.error = action.error;
      })

      // ===================================================

      .addCase(DeleteCartItemAsync.pending, (state) => {
        // state.status = true;
      })
      .addCase(DeleteCartItemAsync.fulfilled, (state, action) => {
        // state.status = true;
        const index = state.carts.findIndex(
          (item) => item.id === action.payload.id
        );

        state.carts.splice(index, 1);
      })
      .addCase(DeleteCartItemAsync.rejected, (state, action) => {
        // state.status = true;
        state.error = action.error;
      });
  },
});

// export const { increment } = counterSlice.actions;

export const selectCarts = (state) => state.cart.carts;

export default CartSlice.reducer;
