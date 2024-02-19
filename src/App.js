import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ErrorPage from "./Pages/ErrorPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ProductsDetailsPage from "./Pages/ProductsDetailsPage";
import Protected from "./features/auth/Components/Protected";
import { fetchCartByUserIdAsync } from "./features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/AuthSlice";
import Order_SuccessPage from "./Pages/Order_SuccessPage";
import UserProfile from "./features/User/Components/UserProfile";
import UserOrdersPage from "./Pages/UserOrdersPage";
// ===================================================================

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product_detail/:id",
    element: (
      <Protected>
        <ProductsDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/order_success/:id",
    element: (
      <Protected>
        <Order_SuccessPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfile />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    user && dispatch(fetchCartByUserIdAsync(user.id));
  }, [dispatch, user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
