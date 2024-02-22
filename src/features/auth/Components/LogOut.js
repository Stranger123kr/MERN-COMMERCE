import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSignOutAsync, selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(UserSignOutAsync());
  }, []);

  return <>{!user && <Navigate to="/login" replace={true} />}</>;
};

export default LogOut;
