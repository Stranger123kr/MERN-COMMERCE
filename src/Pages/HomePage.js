import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Products from "../features/Products/Components/Products";

const HomePage = () => {
  return (
    <>
      <Navbar Children={<Products />} />
    </>
  );
};

export default HomePage;
