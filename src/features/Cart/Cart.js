import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteCartItemAsync,
  UpdateCartAsync,
  selectCarts,
  selectCartsStatus,
} from "./CartSlice";
import EmptyCart from "../Common/EmptyCart";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner";
import Dialogs from "../Common/Dialogs";
import { toast } from "react-toastify";
import { discountPrice } from "../../app/Constant";

// ===================================================================

const Cart = () => {
  const GetAddToCart = useSelector(selectCarts);
  const status = useSelector(selectCartsStatus);
  const dispatch = useDispatch();

  console.log(GetAddToCart);

  const totalAmount = GetAddToCart.reduce(
    (amount, cart) => discountPrice(cart.product) * cart.quantity + amount,
    0
  );

  const totalItemsCount = GetAddToCart.reduce(
    (total, cart) => cart.quantity + total,
    0
  );

  // ===================================================================

  const handleQuantity = (e, item) => {
    dispatch(UpdateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  // ===================================================================
  const [openDialog, setOpenDialog] = useState(null);
  const handleDeleteItems = (item) => {
    dispatch(DeleteCartItemAsync(item.id));
    toast.success(<h3 className="font-bold">{item.product.title} Deleted</h3>);
  };

  // ===================================================================

  return (
    <>
      {status ? (
        <LoadingSpinner />
      ) : (
        <>
          {GetAddToCart.length <= 0 ? (
            <EmptyCart title="Your Cart is Empty" />
          ) : (
            <div className="mx-auto bg-white rounded-[1rem] max-w-5xl px-4 mt-[2rem] sm:px-6 lg:px-[5rem]">
              <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {GetAddToCart &&
                      GetAddToCart.map((cartInfo, index) => (
                        <li key={index} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={cartInfo.product.thumbnail}
                              alt={cartInfo.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={cartInfo.product.title}>
                                    {cartInfo.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ₹
                                  {discountPrice(
                                    cartInfo.product
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <p className="mt-2 text-sm font-[700] text-gray-500">
                                {cartInfo.product.brand}
                              </p>
                              <p className="mt-2 text-sm text-gray-500">
                                Stocks {cartInfo.product.stock}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-100">
                                <label
                                  htmlFor="quantity"
                                  className="inline-block text-[1.1rem] font-[700] leading-6 text-gray-900"
                                >
                                  Qty
                                  <select
                                    className="m-[1rem]"
                                    value={cartInfo.quantity}
                                    onChange={(e) =>
                                      handleQuantity(e, cartInfo)
                                    }
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </label>
                              </div>
                              <div className="flex">
                                {
                                  <Dialogs
                                    title={`Delete ${cartInfo.product.title}`}
                                    message="Are you sure you want to delete this cart item ?"
                                    dangerOption="Delete"
                                    cancelAction={() => setOpenDialog(-1)}
                                    dangerAction={() =>
                                      handleDeleteItems(cartInfo)
                                    }
                                    showDialogs={
                                      openDialog === cartInfo.product.id
                                    }
                                  ></Dialogs>
                                }
                                <button
                                  onClick={() =>
                                    setOpenDialog(cartInfo.product.id)
                                  }
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{totalAmount.toLocaleString()}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items In Cart</p>
                  <p className="mt-0.5  text-gray-500">
                    {totalItemsCount} Items
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link
                      to="/"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
