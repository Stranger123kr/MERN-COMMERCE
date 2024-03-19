import { useDispatch, useSelector } from "react-redux";
import {
  OrderWithPaymentAsync,
  selectCurrentOrder,
  selectUserPaymentInfo,
} from "../features/Order/OrderSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const StripeCheckout = () => {
  const currentOrder = useSelector(selectCurrentOrder);
  const order = useSelector(selectUserPaymentInfo);
  console.log(order);

  console.log(currentOrder);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(order);

  useEffect(() => {
    dispatch(OrderWithPaymentAsync());
  }, []);
  // ====================================

  currentOrder &&
    currentOrder.GetAddToCart.forEach((item) => {
      const options = {
        key: "rzp_test_BqpAdjmem7uL88",
        amount: currentOrder.totalAmount, // Amount for this item
        currency: "INR",
        name: item.product.title,
        description: item.product.description,
        image: item.product.thumbnail,
        order_id: order, // Generate a unique order_id for this item
        handler: (response) => {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          navigate(`/order_success/${currentOrder.id}`);
        },
        prefill: {
          name: item.selectedAddress,
          email: item.user.email,
          contact: item.selectedAddress,
        },
        notes: {
          address: item.user.addresses,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    });
};

export default StripeCheckout;
