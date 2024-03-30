import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOrderAsync,
  fetchAllOrdersAsync,
  fetchOderByIdAsync,
  selectAdminCheck,
  selectAllOrder,
  selectOrdersStatus,
  selectTotalOrders,
} from "../../Order/OrderSlice";
import { ITEMS_PER_PAGE } from "../../../app/Constant";

import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";
import Pagination from "../../Common/Pagination";
import { Link } from "react-router-dom";
const AdminOrders = () => {
  // =============================================

  const orders = useSelector(selectAllOrder);
  const AdminOrderCheck = useSelector(selectAdminCheck);
  const totalOrders = useSelector(selectTotalOrders);
  const status = useSelector(selectOrdersStatus);
  const dispatch = useDispatch();

  // =============================================

  const [Page, setPage] = useState(1);

  // =============================================

  const [editOrderId, setEditOrderId] = useState(-1);

  const handleEditOrder = (order) => {
    setEditOrderId(order.id);
  };

  const handleStatusChange = (e, order) => {
    dispatch(UpdateOrderAsync({ ...order, status: e.target.value }));
    setEditOrderId(-1);
  };

  // =============================================

  // changing color according to status

  const Color = (status) => {
    switch (status) {
      case "pending":
        return `bg-yellow-500 text-black`;

      case "dispatched":
        return `bg-green-600 text-white`;

      case "delivered":
        return `bg-green-300 text-black`;

      case "canceled":
        return `bg-red-600 text-white`;

      default:
        return `bg-yellow-500 text-black`;
    }
  };

  // =============================================

  useEffect(() => {
    const pagination = { _page: Page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [Page]);

  // =============================================

  return (
    <>
      {status ? (
        <LoadingSpinner />
      ) : (
        AdminOrderCheck && (
          <>
            <div className="overflow-x-auto">
              <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full">
                  <div className="bg-white shadow-md rounded my-1">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Items</th>
                          <th className="py-3 px-6 text-center">Total Items</th>
                          <th className="py-3 px-6 text-center">
                            Total Amount
                          </th>
                          <th className="py-3 px-6 text-center">
                            shipping Address
                          </th>
                          <th className="py-3 px-6 text-center">Status</th>
                          <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm  font-light">
                        {orders &&
                          orders.map((orderInfo, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {orderInfo &&
                                  orderInfo.GetAddToCart.map(
                                    (orderItem, od) => (
                                      <div key={od} className="flex gap-[3rem]">
                                        <div>
                                          <img
                                            className="w-[4.2rem] h-[4.2rem] p-[0.5rem]  rounded-lg"
                                            src={orderItem.product.thumbnail}
                                          />
                                        </div>
                                        <span className="font-bold text-[1rem] flex items-center">
                                          {orderItem.product.title}
                                        </span>
                                      </div>
                                    )
                                  )}
                              </td>

                              <td className="py-3 px-6 text-center">
                                <div className="flex font-semibold text-[1rem] items-center justify-center">
                                  {orderInfo.totalItemsCount}
                                </div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div className="flex font-semibold text-[1rem] items-center justify-center">
                                  ₹ {orderInfo.totalAmount.toLocaleString()}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-semibold text-[1rem] ml-[2.1rem]">
                                  <div>{orderInfo.selectedAddress.name}</div>
                                  <div>{orderInfo.selectedAddress.street}</div>
                                  <div> {orderInfo.selectedAddress.city}</div>
                                  <div>{orderInfo.selectedAddress.state}</div>
                                  <div>{orderInfo.selectedAddress.pinCode}</div>
                                  <div>{orderInfo.selectedAddress.phone}</div>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                {orderInfo.id === editOrderId ? (
                                  <select
                                    className={`bg-black cursor-pointer  text-white p-[0.5rem] pr-4 rounded-lg text-[1rem] font-[500]`}
                                    onChange={(e) =>
                                      handleStatusChange(e, orderInfo)
                                    }
                                  >
                                    <option value="pending">Pending</option>{" "}
                                    <option value="dispatched">
                                      Dispatched
                                    </option>{" "}
                                    <option value="delivered">Delivered</option>
                                    <option value="canceled">Canceled</option>
                                  </select>
                                ) : (
                                  <span
                                    className={`${Color(
                                      orderInfo.status
                                    )} cursor-pointer  p-[0.5rem] rounded-lg text-[1rem] font-[500]`}
                                  >
                                    {orderInfo.status}
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-6 text-center">
                                <div className="flex gap-2 item-center justify-center">
                                  <div className="w-5 mr-2  cursor-pointer transform hover:text-purple-500 hover:scale-110">
                                    <Link
                                      to={`/MoreOrders_Info/${orderInfo.id}`}
                                    >
                                      <EyeIcon
                                        onClick={() =>
                                          dispatch(
                                            fetchOderByIdAsync(orderInfo.id)
                                          )
                                        }
                                      />
                                    </Link>
                                  </div>

                                  <div className="w-5 mr-2  cursor-pointer transform hover:text-purple-500 hover:scale-110">
                                    <PencilIcon
                                      onClick={() => handleEditOrder(orderInfo)}
                                    ></PencilIcon>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {
              // =========== This is Pagination Layout start ================

              <Pagination
                Page={Page}
                setPage={setPage}
                totalItems={totalOrders}
              />

              // =========== This is Pagination Layout end ================
            }
          </>
        )
      )}
    </>
  );
};

export default AdminOrders;
