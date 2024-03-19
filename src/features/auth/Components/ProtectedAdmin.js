import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../User/UserSlice";
import { selectLoggedInUserToken } from "../AuthSlice";

const ProtectedAdmin = ({ children }) => {
  const User = useSelector(selectLoggedInUserToken);

  if (!User) {
    return <Navigate to="/login" />;
  }
  if (User && User.role !== "admin") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedAdmin;
