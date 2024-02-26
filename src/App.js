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
import UserProfilePage from "./Pages/UserProfilePage";
import UserOrdersPage from "./Pages/UserOrdersPage";
import { fetchLoggedInUserAsync } from "./features/User/UserSlice";
import LogOut from "./features/auth/Components/LogOut";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/Components/ProtectedAdmin";
import AdminProductsDetailsPage from "./Pages/AdminProductsDetailsPage";
import AdminHomePage from "./Pages/AdminHomePage";
import AdminProductsFormPage from "./Pages/AdminProductsFormPage";
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
    path: "/admin",

    element: (
      <ProtectedAdmin>
        <AdminHomePage />
      </ProtectedAdmin>
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
    path: "/admin/product_detail/:id",

    element: (
      <ProtectedAdmin>
        <AdminProductsDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/products_form",

    element: (
      <ProtectedAdmin>
        <AdminProductsFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/products_form/edit/:id",

    element: (
      <ProtectedAdmin>
        <AdminProductsFormPage />
      </ProtectedAdmin>
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
        <UserProfilePage />
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
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/forgot_password",
    element: <ForgotPasswordPage />,
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
    user && dispatch(fetchLoggedInUserAsync(user.id));
  }, [dispatch, user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
