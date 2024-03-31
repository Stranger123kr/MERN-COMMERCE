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
import {
  CheckAuthAsync,
  selectLoggedInUserToken,
  selectUserCheck,
} from "./features/auth/AuthSlice";
import Order_SuccessPage from "./Pages/OrderSuccessPage";
import UserProfilePage from "./Pages/UserProfilePage";
import UserOrdersPage from "./Pages/UserOrdersPage";
import {
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrdersAsync,
} from "./features/User/UserSlice";
import LogOut from "./features/auth/Components/LogOut";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/Components/ProtectedAdmin";
import AdminProductsDetailsPage from "./Pages/AdminProductsDetailsPage";
import AdminHomePage from "./Pages/AdminHomePage";
import AdminProductsFormPage from "./Pages/AdminProductsFormPage";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RazorpayCheckout from "./Pages/RazorpayCheckout";
import MoreOrderInfoPage from "./Pages/MoreOrderInfoPage";

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
    path: "/stripe_checkout",
    element: (
      <Protected>
        <RazorpayCheckout />
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
    path: "/admin/orders",

    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
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
    path: "/MoreOrders_Info/:id",
    element: (
      <Protected>
        <MoreOrderInfoPage />
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
    path: "/reset_Password",
    element: <ResetPasswordPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const UserCheck = useSelector(selectUserCheck);
  const User = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    dispatch(CheckAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartByUserIdAsync());
    // we can get req.user by token on backend so we don't need to give in frontend
    dispatch(fetchLoggedInUserAsync());
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch, User]);

  return (
    <>
      {UserCheck && <RouterProvider router={router} />}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        rtl={false}
        theme="dark"
        transition={Zoom}
      />
    </>
  );
};

export default App;
