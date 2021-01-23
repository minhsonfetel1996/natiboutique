import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCurrentUser, logout } from "../store/AuthReducer";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  useEffect(() => {
    if (user) {
      dispatch(logout());
    }
  });
  return user ? null : <Redirect to="/" />;
};

export default LogoutComponent;
