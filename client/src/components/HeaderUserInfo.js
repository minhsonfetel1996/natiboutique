import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
          <a href="/profile">{t("LABEL_PROFILE")}</a>
        </li>
        <li className={active ? "item-active" : ""}>
          <a href="/checkout">{t("LABEL_CHECKOUT")}</a>
        </li>
        <li className={active ? "item-active" : ""}>
          <a href="/order">{t("LABEL_TOTAL")}</a>
        </li>
        <li className={active ? "item-active" : ""}>
          <a href="/logout">{t("LABEL_LOG_OUT")}</a>
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
