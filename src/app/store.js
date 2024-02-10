import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/Products/ProductsSlice";
import AuthReducer from "../features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    product: ProductsReducer,
    auth: AuthReducer,
  },
});
