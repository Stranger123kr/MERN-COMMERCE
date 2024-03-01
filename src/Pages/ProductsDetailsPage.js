import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductsDetails from "../features/Products/Components/ProductsDetails";
import Footer from "../features/Common/Footer";
const ProductsDetailsPage = () => {
  return (
    <>
      <Navbar Children={<ProductsDetails />} />
      <Footer />
    </>
  );
};

export default ProductsDetailsPage;
