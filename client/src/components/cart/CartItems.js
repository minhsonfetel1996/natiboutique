import {
  faShoppingBag,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCheckoutClick } from "../../store/AuthReducer";
import {
  checkIsCartEmpty,
  getCartItems,
  getIsCartClicked,
  getTotalBasket,
  removeItem,
  setCartClicked,
} from "../../store/CartReducer";
import { formatPrice } from "../../utils/AppUtils";
import ProductPrices from "../products/ProductPrices";

const CartItems = () => {
  const { t } = useTranslation();
  const cartItems = useSelector(getCartItems);
  const totalBasket = useSelector(getTotalBasket);
  const isCartClicked = useSelector(getIsCartClicked);
  const isCartEmpty = useSelector(checkIsCartEmpty);
  const history = useHistory();

  const dispatch = useDispatch();

  const goToBasketPage = (event) => {
    event && event.preventDefault();
    if (isCartEmpty) {
      return;
    }
    history.push("/basket");
  };

  const onRemoveItemClicked = (item) => {
    dispatch(removeItem(`${item._id}|${item.selectedSize}`, true));
  };

  useEffect(() => {
    return function cleanup() {
      dispatch(setCheckoutClick(false));
    };
  }, [dispatch]);

  return (
    <div className={isCartClicked ? "CartItems w-sm-100 c-show" : "CartItems"}>
      <div className="header">
        <div className="items-amount">
          <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
          {`${(cartItems || []).length} ${t(
            (cartItems || []).length < 2
              ? "LABEL_SHOP_CART_ITEM"
              : "LABEL_SHOP_CART_ITEMS"
          )}`}
        </div>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => dispatch(setCartClicked(false))}
        />
      </div>
      {cartItems && (
        <div className="body">
          {isCartEmpty && (
            <span
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "rgb(119, 121, 140)",
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "40px 0px",
              }}
            >
              {t("LABEL_SHOP_CART_NO_PRODUCTS")}
            </span>
          )}
          {cartItems.map((item) => (
            <div key={`${item._id}|${item.selectedSize}`} className="item">
              <div className="img">
                <Image src={item.image} alt={item.title} thumbnail />
              </div>
              <div className="info">
                <a className="title" href={`/product/${item._id}`}>
                  {item.title}
                </a>
                <div className="quantity">
                  {item.quantity} pc(s){" "}
                  <span className="selectedSize">- {item.selectedSize}</span>
                </div>
                <Row
                  style={{
                    marginLeft: 0,
                  }}
                >
                  <ProductPrices
                    price={{
                      currentPrice: item.totalPrice,
                      oldPrice: item.totalOldPrice,
                    }}
                  />
                </Row>
              </div>
              <Row style={{ display: "block", padding: 0, margin: 0 }}>
                <div className="total-price">
                  {formatPrice(item.totalPrice)}
                </div>
                <div style={{ textAlign: "center" }}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mr-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => onRemoveItemClicked(item)}
                  />
                </div>
              </Row>
            </div>
          ))}
        </div>
      )}
      <div
        onClick={!isCartEmpty ? goToBasketPage : () => {}}
        style={{ cursor: "pointer" }}
        className={isCartEmpty ? "footer disable-btn" : "footer"}
      >
        <span
          style={{
            color: [isCartEmpty ? "#fff" : ""],
          }}
        >
          {t("LABEL_TOTAL")}
        </span>
        <div className="total">{formatPrice(totalBasket)}</div>
      </div>
    </div>
  );
};

export default CartItems;
