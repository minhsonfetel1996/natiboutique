import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "../store/CartReducer";
import { getSelectedSize } from "../store/ProductsReducer";
import { resetAppAlertAction, setAppAlertAction } from "../store/ShopReducer";

const CartBtn = (props) => {
  let { type, product, outOfStock } = props;
  const cartItems = useSelector(getCartItems);
  const selectedSize = useSelector(getSelectedSize);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isExists = (cartItems = [], item = {}) => {
    for (let cartItem of cartItems) {
      if (cartItem._id === item._id) {
        return cartItem;
      }
    }
    return false;
  };

  const onAddToCartClicked = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (selectedSize) {
      window.scrollTo({ top: 0 });
      dispatch(addToCart(product._id, selectedSize));
      dispatch(resetAppAlertAction());
    } else {
      dispatch(
        setAppAlertAction({
          isAlertOpen: true,
          success: false,
          message: t("UNSELECT_SIZE"),
        })
      );
    }
  };

  if (isExists(cartItems, product)) {
    product = isExists(cartItems, product);
  }

  return (
    <div className="CartBtn">
      <button
        className={type === "related" ? "btn related" : "btn"}
        onClick={onAddToCartClicked}
        title={
          outOfStock ? t("LABEL_ADD_TO_CART_BTN") : t("LABEL_OUT_OF_STOCK")
        }
        disabled={outOfStock}
      >
        <FontAwesomeIcon icon={faShoppingBasket} />
        <p>
          {type === "related"
            ? t("LABEL_SHOP_CART")
            : outOfStock
            ? t("LABEL_OUT_OF_STOCK")
            : t("LABEL_ADD_TO_CART_BTN")}
        </p>
      </button>
    </div>
  );
};

CartBtn.propTypes = {
  type: PropTypes.string,
  product: PropTypes.object,
};

export default CartBtn;
