import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { checkIsCartEmpty } from "../store/CartReducer";

const CheckOutRoute = ({ ...rest }) => {
  const isCartEmpty = useSelector(checkIsCartEmpty);
  return isCartEmpty ? <Redirect to="/" /> : <Route {...rest} />;
};

export default CheckOutRoute;
