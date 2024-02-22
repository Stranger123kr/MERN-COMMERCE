import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";

const ProtectedAdmin = ({ children }) => {
  const AuthUser = useSelector(selectLoggedInUser);

  if (!AuthUser) {
    return <Navigate to="/login" />;
  }
  if (AuthUser && AuthUser.role !== "admin") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedAdmin;
