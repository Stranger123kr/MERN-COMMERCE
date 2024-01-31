import React from "react";
import Navbar from "../Components/Navbar";
import Products from "../features/Products/Products";

const HomePage = () => {
  return (
    <>
      <Navbar Children={<Products />} />
    </>
  );
};

export default HomePage;
