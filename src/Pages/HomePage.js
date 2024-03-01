import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Products from "../features/Products/Components/Products";
import Footer from "../features/Common/Footer";
const HomePage = () => {
  return (
    <>
      <Navbar Children={<Products />} />
      <Footer />
    </>
  );
};

export default HomePage;
