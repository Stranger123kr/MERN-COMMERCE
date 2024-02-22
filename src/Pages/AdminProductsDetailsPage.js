import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProductsDetails from "../features/Admin/Components/AdminProductsDetails";
const AdminProductsDetailsPage = () => {
  return (
    <>
      <Navbar Children={<AdminProductsDetails />} />
    </>
  );
};

export default AdminProductsDetailsPage;
