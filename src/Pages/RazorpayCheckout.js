import { useDispatch, useSelector } from "react-redux";
import {
  OrderWithPaymentAsync,
  selectCurrentOrder,
  selectUserPaymentInfo,
} from "../features/Order/OrderSlice";

import { useEffect } from "react";
import { selectUserInfo } from "../features/User/UserSlice";

// ======================================================

const RazorpayCheckout = () => {
  const UserInfo = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const PaymentInfo = useSelector(selectUserPaymentInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OrderWithPaymentAsync(currentOrder.totalAmount));
  }, [dispatch, currentOrder]);
  // ====================================

  currentOrder &&
    currentOrder.GetAddToCart.forEach((item) => {
      const options = {
        key: process.env.REACT_APP_API_KEY,
        amount: PaymentInfo.amount, // Amount for this item
        currency: "INR",
        name: item.product.title,
        description: item.product.description,
        image: item.product.thumbnail,
        order_id: PaymentInfo.id, // Generate a unique order_id for this item
        callback_url:
          "https://mern-commerce-backend-64fw.onrender.com/payment/success",
        prefill: {
          name: currentOrder.selectedAddress.name,
          email: UserInfo.email,
          contact: currentOrder.selectedAddress.phone,
        },
        notes: {
          city: currentOrder.selectedAddress.city,
          pinCode: currentOrder.selectedAddress.pinCode,
          state: currentOrder.selectedAddress.state,
          street: currentOrder.selectedAddress.street,
        },
        theme: {
          color: "#000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", (response) => {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      paymentObject.open();
    });
};

export default RazorpayCheckout;
