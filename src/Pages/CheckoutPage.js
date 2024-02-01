import React from "react";
import { Link } from "react-router-dom";
// ===================================================================

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

// ===================================================================

const addresses = [
  {
    name: "Raju",
    email: "raju@gmail.com",
    street: "D.U 11 Main",
    city: "New Delhi",
    pinCode: "110093",
    state: "Delhi",
    phone: "123456790",
  },
  {
    name: "Dimple",
    email: "dimple@gmail.com",
    street: "Bandra",
    city: "Mumbai",
    pinCode: "400050",
    state: "Maharashtra",
    phone: "7836475873",
  },
];

// ===================================================================

const CheckoutPage = () => {
  return (
    <>
      <form>
        <div className="grid  grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-2 px-[2%]">
          <div className="mx-auto bg-white rounded-[0.7rem] max-w-5xl px-4 my-[3rem] mx-[1rem]  lg:px-[5rem] py-[2rem]">
            <div className="border-b border-gray-900/10 pb-5">
              <h2 className="text-[2rem]  font-[700] leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-3 text-[1rem] leading-6 text-gray-700">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
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
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="rounded-md  bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Reset Page
                </button>
                <button
                  type="button"
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
              <p className="mt-1 text-[1rem] font-[600] mt-3 leading-6 text-gray-600">
                Choose from Existing Address
              </p>

              {
                // Address Part Layout
              }

              <ul
                role="list"
                className="divide-y mt-4 divide-gray-500 border-[1px] rounded-lg  border-red-500 p-[1rem]"
              >
                {addresses.map((address) => (
                  <li
                    key={address.email}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <input
                        id="address"
                        name="address"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-[1rem] font-[600] leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-[1rem] font-[600] leading-5 text-gray-500">
                          {address.email}
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
                        name="payment"
                        type="radio"
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
          </div>

          {
            // this is Cart Layout Start
          }
          <div className="lg:cols-span-5">
            <div className="mx-auto bg-white rounded-[1rem] max-w-2xl px-4 mt-[3rem] sm:px-6 lg:px-[5rem]">
              <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.name}</a>
                              </h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-100">
                              <label
                                htmlFor="quantity"
                                className="inline-block text-[1.1rem] font-[700] leading-6 text-gray-900"
                              >
                                Qty
                                <select className="m-[1rem]">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </label>
                            </div>
                            <div className="flex">
                              <button
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
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$262.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="#"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay Now
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
          </div>
          {
            // this is Cart Layout End
          }
        </div>
      </form>
    </>
  );
};

export default CheckoutPage;
