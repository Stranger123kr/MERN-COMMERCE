import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSignOutAsync, selectLoggedInUserToken } from "../AuthSlice";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  useEffect(() => {
    dispatch(UserSignOutAsync());
  }, [dispatch]);

  return <>{!user && <Navigate to="/login" replace={true} />}</>;
};

export default LogOut;
