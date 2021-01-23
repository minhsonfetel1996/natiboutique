import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItemsSize,
  setCartClicked,
  getTotalBasket,
} from "../../store/CartReducer";
import { formatPrice } from "../../utils/AppUtils";

const Cart = () => {
  const { t } = useTranslation();
  const cartSize = useSelector(getCartItemsSize);
  const totalBasket = useSelector(getTotalBasket);
  const dispatch = useDispatch();

  return (
    <div className="Cart" onClick={() => dispatch(setCartClicked(true))}>
      <div className="item-amount">
        <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
        {cartSize}{" "}
        {cartSize < 2 ? t("LABEL_SHOP_CART_ITEM") : t("LABEL_SHOP_CART_ITEMS")}
      </div>
      <div className="total-price">
        <p>{formatPrice(totalBasket)}</p>
      </div>
    </div>
  );
};
export default Cart;
