import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../store/AuthReducer";
import Burger from "./Burger";

const HeaderUserInfo = () => {
  const [active, setActive] = useState(false);
  const user = useSelector(getCurrentUser);
  const { t } = useTranslation();

  const handleBtnClick = () => {
    setActive(!active);
  };

  return (
    <div className="User h-100">
      <ul className={active ? "nav-links nav-active" : "nav-links"}>
        <li className={active ? "item-active" : ""}>
          <Link to="/profile">{t("LABEL_PROFILE")}</Link>
        </li>
        <li className={active ? "item-active" : ""}>
          <Link to="/checkout">{t("LABEL_CHECKOUT")}</Link>
        </li>
        <li className={active ? "item-active" : ""}>
          <Link to="/order">{t("LABEL_TOTAL")}</Link>
        </li>
        <li className={active ? "item-active" : ""}>
          <Link to="/logout">{t("LABEL_LOG_OUT")}</Link>
        </li>
      </ul>
      <div className="welcome" onClick={handleBtnClick}>
        {user.displayName}
        <Burger isTopMenu={true} isClick={active} />
      </div>
    </div>
  );
};

export default HeaderUserInfo;
