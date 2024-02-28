import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOrderAsync,
  fetchAllOrdersAsync,
  selectAllOrder,
  selectTotalOrders,
} from "../../Order/OrderSlice";
import { ORDERS_PER_PAGE } from "../../../app/Constant";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
const AdminOrders = () => {
  // =============================================

  const orders = useSelector(selectAllOrder);
  const totalOrders = useSelector(selectTotalOrders);
  const dispatch = useDispatch();

  // =============================================

  const [Page, setPage] = useState(1);

  const handlePagination = (page) => {
    setPage(page);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  // =============================================

  const [editOrderId, setEditOrderId] = useState(-1);

  const handleViewOrder = (order) => {
    console.log("view");
    setEditOrderId(order.id);
  };

  const handleEditOrder = (order) => {
    setEditOrderId(order.id);
  };

  const handleStatusChange = (e, order) => {
    dispatch(UpdateOrderAsync({ ...order, status: e.target.value }));
    setEditOrderId(-1);
  };

  const [sort, setSort] = useState({});

  const handleSort = (newSort) => {
    setSort(newSort);
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
    const pagination = { _page: Page, _limit: ORDERS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [Page, sort]);

  // =============================================

  return (
    <>
      <>
        {/* component */}
        <div className="overflow-x-auto">
          <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-1">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left flex gap-2  cursor-pointer"
                        onClick={(e) =>
                          handleSort({
                            _sort: "id",
                            _order: sort._order === "desc" ? "asc" : "desc",
                          })
                        }
                      >
                        Orders{" "}
                        {sort._sort === "id" && sort._order === "desc" ? (
                          <ArrowDownIcon className="w-4 h-4 mt-[0.2rem]" />
                        ) : (
                          <ArrowUpIcon className="w-4 h-4 mt-[0.2rem]" />
                        )}
                      </th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-center">Total Items</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
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
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <span className="font-medium">{orderInfo.id}</span>
                          </td>
                          <td className="py-3 px-6 text-left">
                            {orderInfo &&
                              orderInfo.GetAddToCart.map((orderItem, od) => (
                                <div key={od} className="flex gap-[3rem]">
                                  <div>
                                    <span className="font-[500] text-gray-500 text-[1rem]">
                                      q {orderItem.quantity}
                                    </span>
                                    <img
                                      className="w-[5.5rem] h-[5.5rem] p-[0.5rem]  rounded-[1.1rem]"
                                      src={orderItem.thumbnail}
                                    />
                                  </div>
                                  <span className="font-bold text-[1rem] flex items-center">
                                    {orderItem.title.slice(0, 25)}
                                    <br></br>
                                    <br></br>₹{orderItem.price}
                                  </span>
                                </div>
                              ))}
                          </td>

                          <td className="py-3 px-6 text-center">
                            <div className="flex font-semibold text-[1rem] items-center justify-center">
                              {orderInfo.totalItemsCount}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex font-semibold text-[1rem] items-center justify-center">
                              ₹{orderInfo.totalAmount.toLocaleString()}
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
                                <option value="dispatched">Dispatched</option>{" "}
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
                                <EyeIcon
                                  onClick={() => handleViewOrder(orderInfo)}
                                ></EyeIcon>
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

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setPage((pre) => pre - 1)}
                disabled={Page <= 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((next) => next + 1)}
                disabled={Page >= totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                {
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(Page - 1) * ORDERS_PER_PAGE + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Page * ORDERS_PER_PAGE > totalOrders
                        ? totalOrders
                        : Page * ORDERS_PER_PAGE}
                    </span>{" "}
                    of <span className="font-medium">{totalOrders}</span>{" "}
                    results
                  </p>
                }
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setPage((pre) => pre - 1)}
                    disabled={Page <= 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      aria-current="page"
                      onClick={() => handlePagination(index + 1)}
                      className={`relative ${
                        Page === index + 1
                          ? `bg-red-500 text-white`
                          : "text-gray-400"
                      }  z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((next) => next + 1)}
                    disabled={Page >= totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>

          // =========== This is Pagination Layout end ================
        }
      </>
    </>
  );
};

export default AdminOrders;
