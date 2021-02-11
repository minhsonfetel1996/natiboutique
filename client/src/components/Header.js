import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Container, NavbarBrand } from "reactstrap";
import { isLoggedInUser } from "../store/AuthReducer";
import { getCartItemsSize } from "../store/CartReducer";
import HeaderUserInfo from "./HeaderUserInfo";
import LanguagesComponent from "./Languages";
import SearchBar from "./SearchBar";

const Header = () => {
  const isLoggedIn = useSelector(isLoggedInUser);
  const cartSize = useSelector(getCartItemsSize);
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <header className="shop-header__desktop">
      <LanguagesComponent languages={["vn", "en"]} />
      <div className="wrapper">
        <Container className="justify-content-between">
          <div>
            <NavbarBrand className="logo" href="/">
              NaTi Shop
          </NavbarBrand>
          </div>
          {<SearchBar />}
          <div>
            {isLoggedIn ? (
              <HeaderUserInfo />
            ) : (
              <div className="shop-header__btn-sign-in"
                onClick={() => {
                  history.push("/sign-in")
                }} title={t("LABEL_SIGN_IN")}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
          <div className="shop-header__shopping-cart"
            title={t("LABEL_SHOP_CART")}
            onClick={() => history.push("/basket")}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="shop-header__shopping-cart__quantity"><Badge>{cartSize}</Badge></span>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
