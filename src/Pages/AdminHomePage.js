import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProducts from "../features/Admin/Components/AdminProducts";

const HomePage = () => {
  return (
    <>
      <Navbar Children={<AdminProducts />} />
    </>
  );
};

export default HomePage;
