import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ProductPrices from "../components/products/ProductPrices";
import {
  checkIsCartEmpty,
  getCartItems,
  getTotalBasket,
  removeItem,
  setCartClicked
} from "../store/CartReducer";
import { isAppReady } from "../store/ShopReducer";
import { formatPrice } from "../utils/AppUtils";

const BasketPage = () => {
  const isCartEmpty = useSelector(checkIsCartEmpty);
  const cartItems = useSelector(getCartItems);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const totalBasket = useSelector(getTotalBasket);
  const appReady = useSelector(isAppReady);

  const onRemoveItemClicked = (item) => {
    dispatch(removeItem(`${item._id}|${item.selectedSize}`, false));
  };

  const onGoToDetailClicked = (_id) => {
    dispatch(setCartClicked(false));
    history.push(`/products/${_id}`);
  };

  if (!appReady) {
    return null;
  }

  if (isCartEmpty) {
    return <Redirect to="/products" />;
  }

  return (
    <div id="basket-container">
      <Row className="basket-title">{t("LABEL_CART")}</Row>
      <div className="basket-items my-4">
        {cartItems.map((item, index) => {
          return (
            <Row key={index} className="my-4">
              <Col md={2} sm={4} xs={4}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width="100%"
                  height="100%"
                />
              </Col>
              <Col md={10} sm={8} xs={8} className="p-2">
                <Row>
                  <Col
                    sm={5}
                    xs={12}
                    className="item-title font-weight-bold"
                    title={t("LABEL_GO_TO_DETAIL")}
                    onClick={() => onGoToDetailClicked(item._id)}
                  >
                    {item.title}
                  </Col>
                  <Col sm={2} xs={12} className="font-weight-bold my-1">
                    {item.quantity}
                  </Col>
                  <Col sm={3} xs={12} className="font-weight-bold my-1">
                    <ProductPrices
                      price={{
                        currentPrice: item.totalPrice,
                        oldPrice: item.totalOldPrice,
                      }}
                    />
                  </Col>
                  <Col
                    sm={2}
                    xs={12}
                    onClick={() => onRemoveItemClicked(item)}
                    title={t("LABEL_BTN_REMOVE")}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </div>
      <hr />
      <Row className="total-basket">
        <Col md={5} xs={4}></Col>
        <Col md={3} xs={4} className="font-weight-bold">
          {t("TOTAL_BASKET")}
        </Col>
        <Col sm={3} xs={4} className="price font-weight-bold p-0">
          {formatPrice(totalBasket || "0")}
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Button
          style={{ cursor: "pointer" }}
          className="btn btn-checkout"
          disabled={isCartEmpty}
          onClick={() => history.push("/checkout")}
        >
          {t("LABEL_CHECKOUT")}
        </Button>
      </Row>
    </div>
  );
};

export default BasketPage;
