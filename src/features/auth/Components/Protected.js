import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";

const Protected = ({ children }) => {
  const AuthUser = useSelector(selectLoggedInUser);

  if (!AuthUser) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default Protected;
