import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { get } from "../../services/HttpService";
import {
  getSelectedSize,
  setSelectedSizeAction,
} from "../../store/ProductsReducer";
import { LazyImage } from "../../utils/LazyImage";
import CartBtn from "../CartBtn";
import SimpleSlider from "../slick/SimpleSlider";
import SpinnerLoading from "../SpinnerLoading";
import ProductPrices from "./ProductPrices";

const ProductDetail = () => {
  const [isShow] = useState(false);
  const { params } = useRouteMatch();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const selectedSize = useSelector(getSelectedSize);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      window.scrollTo({ top: -100 });
    }
    const _id = params.id;
    if (_id && !product) {
      get(`/products/${_id}`)
        .then((res) => {
          setProduct(res.data.data);
        })
        .catch((error) => {
          console.log("Have error during get product by id: ", error);
        });
    } else {
      setIsReady(true);
      document.title = product.title || "NaTi Shop";
    }
  }, [isReady, product, params, dispatch]);

  const isOutOfStock = (prod) => {
    return (
      prod.sizes &&
      (prod.sizes.length === 0 ||
        prod.sizes.filter((s) => s.onStock).length === 0)
    );
  };

  const onSelectSize = (selectedSize) => {
    dispatch(setSelectedSizeAction(selectedSize));
  };

  if (!isReady) {
    return <SpinnerLoading />;
  } else {
    return (
      <div className="ProductView py-5">
        <div>
          <Row>
            <Col md="7" xs={12} className="mb-5">
              <div className="img-wrapper visible-md">
                <Row style={{ marginRight: 0 }}>
                  {product.images &&
                    product.images.map((image, index) => {
                      return (
                        <div className="mb-1" key={index}>
                          <LazyImage
                            title={product.title + "_" + index}
                            newImageSrc={image}
                            alt="placeholder"
                          />
                        </div>
                      );
                    })}
                </Row>
              </div>
              <div className="img-wrapper visible-sm visible-xs">
                <SimpleSlider items={product.images} />
              </div>
            </Col>
            <Col md="5" xs={12}>
              <div className="title">
                <h1>{product.title}</h1>
              </div>
              <Row style={{ marginLeft: "0px" }}>
                <ProductPrices price={product.price} />
              </Row>
              {!isOutOfStock(product) && (
                <Row className="product_sizes_container">
                  {product.sizes.map((data, index) => {
                    return (
                      <div
                        className={
                          data.onStock
                            ? `mb-2 ml-1 ${
                                data.size === selectedSize
                                  ? " selectedSize"
                                  : " size"
                              }`
                            : `mb-2 ml-1 product_size_outOfStock ${
                                data.size === selectedSize
                                  ? " selectedSize"
                                  : " size"
                              }`
                        }
                        key={index}
                        onClick={() => onSelectSize(data.size)}
                      >
                        {data.size}
                      </div>
                    );
                  })}
                </Row>
              )}
              <div className="des mt-1">
                <p className={isShow ? "des-show" : ""}>
                  {product.description}
                </p>
              </div>
              <div className="mt-2">
                <CartBtn product={product} outOfStock={isOutOfStock(product)} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
