import React from "react";
import ProductsForm from "../features/Admin/Components/ProductsForm";
import Navbar from "../features/Navbar/Navbar";

const AdminProductsFormPage = () => {
  return (
    <>
      <Navbar Children={<ProductsForm />} />
    </>
  );
};

export default AdminProductsFormPage;
