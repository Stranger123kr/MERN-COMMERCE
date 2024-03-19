import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { selectLoggedInUserToken } from "../features/auth/AuthSlice";
import { ResetCartAsync } from "../features/Cart/CartSlice";
import { ResetOrder } from "../features/Order/OrderSlice";
const Order_SuccessPage = () => {
  const { id } = useParams();
  const user = useSelector(selectLoggedInUserToken);

  const dispatch = useDispatch();

  // ========================================

  useEffect(() => {
    // reset cart
    dispatch(ResetCartAsync());

    // reset current order
    dispatch(ResetOrder());
  }, [user]);
  return (
    <>
      {!id && (
        <Navigate to="/" replace={true}>
          {" "}
        </Navigate>
      )}
      <main className="grid min-h-full place-items-center h-screen bg-white px-2 py-2 sm:py-4 lg:px-5">
        <div className="text-center">
          <p className="sm:text-[4rem] text-[2rem]  font-[800]">
            Order Successfully Placed
          </p>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{id}
          </h1>
          <p className="mt-6 text-[1.3rem] font-[600] leading-7 text-gray-600">
            Check your order in your account --- My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Order_SuccessPage;
