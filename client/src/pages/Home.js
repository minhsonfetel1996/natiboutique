import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Cart from "../components/cart/Cart";
import CartItems from "../components/cart/CartItems";
import Header from "../components/Header";
import LogoutComponent from "../components/LogoutComponent";
import ProductDetail from "../components/products/ProductDetail";
import ProductsList from "../components/products/ProductsList";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import CheckOutRoute from "../routes/CheckoutRoute";
import { hasCartFlagCartFromState } from "../store/ShopReducer";
import BasketPage from "./Basket";

const HomePage = () => {
  const hasCart = useSelector(hasCartFlagCartFromState);

  return (
    <div className="Home">
      <Header isTopMenu={true} />
      <div id="shop-content">
        {!hasCart && (
          <>
            <Cart />
            <CartItems />
          </>
        )}
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <CheckOutRoute exact path="/basket" component={BasketPage} />
          <Route exact path="/logout" component={LogoutComponent} />
          <Redirect to="/products" />
        </Switch>
      </div>
    </div>
  );
};

export default HomePage;
