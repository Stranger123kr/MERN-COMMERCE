import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteCartItemAsync,
  UpdateCartAsync,
  selectCarts,
} from "../features/Cart/CartSlice";
import { CreateOrderAsync } from "../features/Order/OrderSlice";
import { useForm } from "react-hook-form";
import {
  UpdateUserAsync,
  selectLoggedInUser,
} from "../features/auth/AuthSlice";

// ===================================================================

const CheckoutPage = () => {
  const GetAddToCart = useSelector(selectCarts);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ===================================================================

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handelSelectAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  // ===================================================================
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handelPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  // ===================================================================

  const handleOrder = () => {
    const order = {
      GetAddToCart,
      totalAmount,
      totalItemsCount,
      user,
      selectedAddress,
      paymentMethod,
    };
    dispatch(CreateOrderAsync(order));
    navigate("/");
    // TODD :   redirect to order-success page
    // TODD :   clear cart after order
    // TODD :   on server change the number of stocks in products
  };

  // ===================================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ===================================================================

  const totalAmount = GetAddToCart.reduce(
    (amount, cart) => cart.price * cart.quantity + amount,
    0
  );
  const totalItemsCount = GetAddToCart.reduce(
    (total, cart) => cart.quantity + total,
    0
  );

  // ===================================================================

  const handleQuantity = (e, item) => {
    console.log(+e.target.value);
    console.log(item.id);
    dispatch(UpdateCartAsync({ ...item, quantity: +e.target.value }));
  };

  // ===================================================================

  const handleDeleteItems = (e, id) => {
    dispatch(DeleteCartItemAsync(id));
  };

  // ===================================================================

  return (
    <>
      <div className="grid  grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-2 px-[2%]">
        <div className="mx-auto bg-white rounded-[0.7rem] max-w-5xl px-4 my-[3rem]  lg:px-[5rem] py-[2rem]">
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
              reset();
              dispatch(
                UpdateUserAsync({
                  ...user,
                  addresses: [...user.addresses, data],
                })
              );
            })}
          >
            <div className="border-b border-gray-900/10 pb-5">
              <h2 className="text-[2rem]  font-[700] leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-3 text-[1rem] leading-6 text-gray-700">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("name", { required: "name is Required" })}
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-red-600 font-[700]">
                    {errors.name && errors.name.message}
                  </p>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "phone is Required",

                        minLength: {
                          value: 10,
                          message: "Phone must be at least 10 digits",
                        },
                        maxLength: {
                          value: 10,
                          message: "Phone must be at most 10 digits",
                        },
                      })}
                      id="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-red-600 font-[700]">
                    {errors.phone && errors.phone.message}
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("street", {
                        required: "street Address is Required",
                      })}
                      id="street"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-red-600 font-[700]">
                    {errors.street && errors.street.message}
                  </p>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("city", {
                        required: "city is Required",
                      })}
                      id="city"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-red-600 font-[700]">
                    {errors.city && errors.city.message}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("state", {
                        required: "state is Required",
                      })}
                      id="state"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-red-600 font-[700]">
                    {errors.state && errors.state.message}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="pinCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("pinCode", {
                        required: "pinCode is Required",
                      })}
                      id="pinCode"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <p className="text-red-600 font-[700]">
                  {errors.pinCode && errors.pinCode.message}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => reset()}
                  type="button"
                  className="rounded-md  bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Reset Page
                </button>
                <button
                  type="Submit"
                  className="rounded-md  bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
            </div>

            <div className="pb-5">
              <h2 className="text-[1.4rem] font-[700] mt-6 leading-7 text-green-600">
                Addresses
              </h2>
              <p className="text-[1rem] font-[600] mt-3 leading-6 text-gray-600">
                Choose from Existing Address
              </p>

              {
                // Address Part Layout
              }

              {user.addresses >= 0 ? (
                <h2 className="mt-4 font-[700]  text-[1.5rem]">
                  ! But Create First -------
                </h2>
              ) : (
                <ul
                  role="list"
                  className="divide-y mt-4 divide-gray-500 border-[1px] rounded-lg  border-red-500 p-[1rem]"
                >
                  {user.addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <input
                          id="address"
                          name="address"
                          onChange={handelSelectAddress}
                          value={index}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-[1rem] font-[600] leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-[1rem] font-[600] leading-5 text-gray-500">
                            {user.email}
                          </p>
                          <p className="mt-1 truncate text-[0.9rem] font-[600] leading-5 text-gray-500">
                            <span className="text-gray-900">Phone : </span>
                            {address.phone}
                          </p>
                        </div>
                      </div>

                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-[1rem] font-[600] leading-6 text-gray-600">
                          {address.state}
                        </p>
                        <p className="text-[1rem] font-[600] leading-6 text-gray-600">
                          {address.city}
                        </p>
                        <p className="text-[1rem] font-[600] leading-6 text-gray-600">
                          {address.street}
                        </p>
                        <p className="text-[1rem] font-[600] leading-6 text-gray-600">
                          {address.pinCode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-[1.5rem] font-[700] leading-6 text-indigo-900">
                    Payment Methods
                  </legend>
                  <p className="mt-3 text-[1rem] font-[500] leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6  space-y-6">
                    <div className="flex  items-center gap-x-3">
                      <input
                        id="card"
                        value="card"
                        name="payment"
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={(e) => handelPaymentMethod(e)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-lg font-bold leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payment"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        onChange={(e) => handelPaymentMethod(e)}
                        value="cash"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-lg font-bold leading-6 text-red-900"
                      >
                        Cash Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
        {
          // this is Cart Layout Start
        }
        <div className="lg:cols-span-5">
          <div className="mx-auto bg-white rounded-[1rem] max-w-2xl px-4 mt-[3rem] sm:px-6 lg:px-[5rem]">
            <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {GetAddToCart &&
                    GetAddToCart.map((cartInfo) => (
                      <li key={cartInfo.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={cartInfo.thumbnail}
                            alt={cartInfo.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={cartInfo.title}>{cartInfo.title}</a>
                              </h3>
                              <p className="ml-4">₹{cartInfo.price}</p>
                            </div>
                            <p className="mt-2 text-sm font-[700] text-gray-500">
                              {cartInfo.breadcrumbs[0].name}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                              Stocks {cartInfo.stock}
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
                                  onChange={(e) => handleQuantity(e, cartInfo)}
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
                              <button
                                onClick={(e) =>
                                  handleDeleteItems(e, cartInfo.id)
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
                <p>₹{totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items In Cart</p>
                <p className="mt-0.5  text-gray-500">{totalItemsCount} Items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleOrder}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </button>
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
        </div>
        {
          // this is Cart Layout End
        }
      </div>
    </>
  );
};

export default CheckoutPage;
