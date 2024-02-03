import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/Products/ProductsSlice";

export const store = configureStore({
  reducer: {
    product: ProductsReducer,
  },
});
