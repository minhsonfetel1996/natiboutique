import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, NavbarBrand } from "reactstrap";
import { isLoggedInUser, setCheckoutClick } from "../store/AuthReducer";
import HeaderUserInfo from "./HeaderUserInfo";
import LanguagesComponent from "./Languages";
import SearchBar from "./SearchBar";

const Header = ({ isTopMenu }) => {
  const isLoggedIn = useSelector(isLoggedInUser);
  const [isClicked, setClicked] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignInClick = () => {
    dispatch(setCheckoutClick(true));
    history.push("/sign-in");
  };

  return (
    <header className="TopMenu TopMenuMobile">
      {isClicked ? (
        <>
          <LanguagesComponent languages={["vn", "en"]} />
          <div className="search-bar">
            <div className="wrapper">
              <SearchBar
                isTopMenuMobile={true}
                setClicked={() => setClicked(false)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <LanguagesComponent languages={["vn", "en"]} />
          <div className="wrapper">
            <Container className="justify-content-between">
              {isTopMenu && (
                <div className="mobile-btn d-flex d-xl-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    onClick={() => setClicked(true)}
                  />
                </div>
              )}
              <div>
                <NavbarBrand className="logo" href="/">
                  NaTi Shop
                </NavbarBrand>
              </div>
              {<SearchBar isTopMenu={true} />}
              <div className="user-btn">
                {isLoggedIn ? (
                  <HeaderUserInfo />
                ) : (
                  <Button onClick={onSignInClick} title={t("LABEL_SIGN_IN")}>
                    {t("LABEL_SIGN_IN")}
                  </Button>
                )}
              </div>
            </Container>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
