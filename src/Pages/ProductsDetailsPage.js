import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductsDetails from "../features/Products/Components/ProductsDetails";
const ProductsDetailsPage = () => {
  return (
    <>
      <Navbar Children={<ProductsDetails />} />
    </>
  );
};

export default ProductsDetailsPage;
