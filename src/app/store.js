import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/Products/ProductsSlice";
import AuthReducer from "../features/auth/AuthSlice";
import CartReducer from "../features/Cart/CartSlice";

export const store = configureStore({
  reducer: {
    product: ProductsReducer,
    auth: AuthReducer,
    cart: CartReducer,
  },
});
