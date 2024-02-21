import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../UserSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import EmptyOrder from "../../EmptyCart/EmptyCart";
const UserOrders = () => {
  const orders = useSelector(selectUserOrders);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  // ==============================================

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [user]);

  // ==============================================

  return (
    <>
      {orders.length <= 0 ? (
        <EmptyOrder title="Your Orders are Empty" />
      ) : (
        <div className=" pb-[2rem]">
          {orders.map((order) => (
            <div key={order.id}>
              <div className="mx-auto bg-white rounded-[1rem] max-w-5xl px-4 mt-[2rem]  sm:px-6 lg:px-[5rem]">
                <h3 className="text-center py-3">{order.status}</h3>
                <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h3 className="text-[1.2rem] my-5 font-bold tracking-tight text-gray-500">
                    Order ID : {order.id}
                  </h3>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.GetAddToCart.map((cartInfo) => (
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
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t mt-5 border-gray-200 px-4 py-3 sm:px-6">
                    <h3 className="text-[1.2rem] my-[1rem] font-bold text-gray-400">
                      Shipping Details :
                    </h3>
                    <div className="border-t  w-[14rem] border-gray-400 px-4 py-3 sm:px-6"></div>
                    <ul>
                      <li>
                        Name :{" "}
                        <span className="text-[1rem] font-bold">
                          {order.selectedAddress.name}
                        </span>
                      </li>
                      <li>
                        Street :{" "}
                        <span className="text-[1rem] font-bold">
                          {order.selectedAddress.street}
                        </span>
                      </li>
                      <li>
                        PinCode :{" "}
                        <span className="text-[1rem] font-bold">
                          {order.selectedAddress.pinCode}
                        </span>
                      </li>
                      <li>
                        City :{" "}
                        <span className="text-[1rem] font-bold">
                          {order.selectedAddress.city}
                        </span>
                      </li>
                      <li>
                        State :{" "}
                        <span className="text-[1rem] font-bold">
                          {order.selectedAddress.state}
                        </span>
                      </li>
                      <li>
                        Phone Number :{" "}
                        <span className="text-[1rem] font-bold">
                          {order.selectedAddress.phone}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₹{order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items In Cart</p>
                    <p className="mt-0.5  text-gray-500">
                      {order.totalItemsCount} Items
                    </p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Payment Method</p>
                    <p className="mt-0.5  text-gray-500">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrders;
