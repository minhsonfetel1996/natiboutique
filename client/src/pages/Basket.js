import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DropdownComponent from "../components/form/DropdownComponent";
import TextBoxComponent from "../components/form/TextBoxComponent";
import ProductPrices from "../components/products/ProductPrices";
import {
  checkIsCartEmpty,
  getCartItems,
  getTotalBasket,
  removeItem,
  setCartClicked,
} from "../store/CartReducer";
import { setHasCartAction } from "../store/ShopReducer";
import { formatPrice } from "../utils/AppUtils";

const BasketPage = () => {
  const cartItems = useSelector(getCartItems);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isCartEmpty = useSelector(checkIsCartEmpty);
  const totalBasket = useSelector(getTotalBasket);

  useEffect(() => {
    dispatch(setHasCartAction(true));
    return function cleanup() {
      dispatch(setHasCartAction(false));
    };
  }, [dispatch]);

  const onRemoveItemClicked = (item) => {
    dispatch(removeItem(`${item._id}|${item.selectedSize}`, false));
  };

  const onGoToDetailClicked = (_id) => {
    dispatch(setCartClicked(false));
    history.push(`/products/${_id}`);
  };

  return (
    <div id="basket-container">
      <Row>
        <Col sm={8}>
          <Row className="basket-title">
            <div>
              <h4>{t("LABEL_CART")}</h4>
            </div>
          </Row>
          <div className="basket-items">
            {cartItems.map((item, index) => {
              return (
                <Row key={index}>
                  <Row className="basket-item">
                    <Col md={3} sm={3} className="img pl-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width="100%"
                        height="100%"
                      />
                    </Col>
                    <Col md={6} sm={6} className="item-info">
                      <div
                        className="item-title"
                        title={t("LABEL_GO_TO_DETAIL")}
                        onClick={() => onGoToDetailClicked(item._id)}
                      >
                        {item.title}
                      </div>
                      <Row className="item-price">
                        <Col md={2} sm={2} xs={2} className="pr-0">
                          {t("LABEL_PRICE")}:
                        </Col>
                        <Col
                          md={10}
                          sm={10}
                          xs={10}
                          style={{ display: "flex", padding: 0 }}
                        >
                          <ProductPrices
                            price={{
                              currentPrice: item.currentPrice,
                              oldPrice: item.oldPrice,
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="item-variant">
                        <Col md={8} sm={8} xs={12}>
                          <Row>
                            <Col md={6} sm={12} xs={12}>
                              <DropdownComponent
                                label={t("LABEL_SIZE")}
                                id="dd-size"
                                name="size"
                                options={[
                                  {
                                    id: 0,
                                    name: item.selectedSize,
                                  },
                                ]}
                              />
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                              <DropdownComponent
                                label={t("LABEL_QUANTITY")}
                                id="dd-quantity"
                                name="quantity"
                                options={[
                                  {
                                    id: 0,
                                    name: item.quantity,
                                  },
                                ]}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3} sm={3} className="item-total-price visible-md">
                      <ProductPrices
                        price={{
                          currentPrice: item.totalPrice,
                          oldPrice: item.totalOldPrice,
                        }}
                      />
                      <Button
                        className="btn btn-remove-item"
                        onClick={() => onRemoveItemClicked(item)}
                        title={t("LABEL_BTN_REMOVE")}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      </Button>
                    </Col>
                  </Row>
                </Row>
              );
            })}
          </div>
        </Col>
        <Col sm={3} className="basket-bill">
          <div className="basket-bill-title">
            <h4>{t("LABEL_ORDER")}</h4>
          </div>
          <div className="promotion-form">
            <Row>
              <Col md={8} sm={9} className="pl-0 pr-0">
                <TextBoxComponent
                  label={t("LABEL_PROMOTION_CODE")}
                  id="tb-promotion"
                  name="promotion"
                  title={t("LABEL_PROMOTION_CODE")}
                  onChange={() => {}}
                  required={true}
                />
              </Col>
              <Col md={4} sm={3} className="pl-0 pr-0">
                <Button className="btn-apply-promotion" disabled={true}>
                  {t("LABEL_APPLY")}
                </Button>
              </Col>
            </Row>
          </div>
          <div className="bill-summary">
            <Row className="bill-price">
              <Col sm={8}>{t("TOTAL_BASKET")}</Col>
              <Col sm={4} className="price">
                {formatPrice(totalBasket || "0")}
              </Col>
            </Row>
            <Row className="bill-promotion">
              <Col sm={8}>{t("LABEL_PROMOTION")}</Col>
              <Col sm={4} className="price">
                {formatPrice("0")}
              </Col>
            </Row>
          </div>
          <Row className="justify-content-center p-0">
            <Button
              className="btn btn-checkout"
              disabled={isCartEmpty}
              onClick={() => history.push("/checkout")}
            >
              {t("LABEL_CHECKOUT")}
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default BasketPage;
