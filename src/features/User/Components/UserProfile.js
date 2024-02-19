import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserAsync, selectUserInfo } from "../UserSlice";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/AuthSlice";

const UserProfile = () => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  console.log(userInfo);
  useEffect(() => {
    dispatch(fetchLoggedInUserAsync(user.id));
  }, [user]);
  return (
    <div>
      {userInfo.email} <Link to="/">Back</Link>
    </div>
  );
};

export default UserProfile;
