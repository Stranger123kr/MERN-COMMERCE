import React, { useEffect } from "react";
import {
  fetchOderByIdAsync,
  selectAdminCheck,
  selectOrderById,
  selectStatus,
} from "../../Order/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { discountPrice } from "../../../app/Constant";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";

const MoreOrderInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderById);
  const AdminOrderCheck = useSelector(selectAdminCheck);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchOderByIdAsync(id));
  }, [dispatch, id]);

  return (
    <>
      {status ? (
        <LoadingSpinner />
      ) : (
        AdminOrderCheck && (
          <>
            <div className="flex flex-wrap  items-center justify-center">
              {orders &&
                orders.GetAddToCart.map((orderItem, index) => (
                  <div
                    key={index}
                    className="flex mt-[1rem] mb-[3rem] items-center justify-center  bg-gray-100"
                  >
                    <div className="mx-auto px-5">
                      <div className="w-[23rem]  cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                        <img
                          className="w-[100%] h-[19rem] rounded-lg object-cover object-center"
                          src={orderItem.product.thumbnail}
                          alt="product"
                        />
                        <div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Order Id
                            </p>
                            <p className="px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orders.id}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Product Name
                            </p>
                            <p className="px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orderItem.product.title}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Product Brand
                            </p>
                            <p className="px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orderItem.product.brand}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Product Price
                            </p>

                            <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                              ₹
                              {discountPrice(
                                orderItem.product
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Item Total Price
                            </p>

                            <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                              ₹
                              {discountPrice(orderItem.product) *
                                orderItem.quantity}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Product Quantity
                            </p>
                            <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orderItem.quantity}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Payment Method
                            </p>
                            <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orders.paymentMethod}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Order Time
                            </p>
                            <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orders.createdAt
                                ? new Date(orders.createdAt).toLocaleString()
                                : null}
                            </p>
                          </div>
                          <div className="my-4 flex items-center justify-between px-4">
                            <p className="text-sm font-semibold text-gray-500">
                              Update Time
                            </p>
                            <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                              {orders.updatedAt
                                ? new Date(orders.updatedAt).toLocaleString()
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )
      )}
    </>
  );
};

export default MoreOrderInfo;
