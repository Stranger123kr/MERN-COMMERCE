import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminOrder from "../features/Admin/Components/AdminOrders";
const AdminOrdersPage = () => {
  return (
    <>
      <Navbar Children={<AdminOrder />} />
    </>
  );
};

export default AdminOrdersPage;
