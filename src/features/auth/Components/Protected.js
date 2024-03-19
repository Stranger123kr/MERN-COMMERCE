import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../AuthSlice";

const Protected = ({ children }) => {
  const AuthUserToken = useSelector(selectLoggedInUserToken);

  if (!AuthUserToken) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default Protected;
