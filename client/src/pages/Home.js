import React from "react";
import { Redirect, Route, Switch } from "react-router";
import CustomizeAlertComponent from "../components/CustomizeAlertComponent";
import Header from "../components/Header";
import LogoutComponent from "../components/LogoutComponent";
import ProductDetail from "../components/products/ProductDetail";
import ProductsList from "../components/products/ProductsList";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import BasketPage from "../pages/Basket";
import CheckOutRoute from "../routes/CheckoutRoute";
import UserRoute from "../routes/UserRoute";

const HomePage = () => {
  return (
    <div className="Home">
      <Header />
      <CustomizeAlertComponent />
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <CheckOutRoute exact path="/basket" component={BasketPage} />
        <UserRoute exact path="/logout" component={LogoutComponent} />
        <Redirect to="/products" />
      </Switch>
    </div>
  );
};

export default HomePage;
