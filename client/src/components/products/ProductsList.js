import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Row, Spinner } from "reactstrap";
import {
  getFilters,
  getHasMore,
  getIsLoading,
  getProducts,
  getProductsAction,
  getTotalProducts,
  onLoadMoreBtnClick,
} from "../../store/ProductsReducer";
import { runLazyLoadingProcess } from "../../utils/ImageLazyLoading";
import Product from "./Product";

const ProductsList = () => {
  const filtersFromStore = useSelector(getFilters);
  const products = useSelector(getProducts);
  const isLoading = useSelector(getIsLoading);
  const hasMore = useSelector(getHasMore);
  const totalProduct = useSelector(getTotalProducts);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!products) {
      dispatch(getProductsAction(filtersFromStore));
    }
  }, [filtersFromStore, products, dispatch]);

  const handleLoadMore = () => {
    dispatch(onLoadMoreBtnClick());
    filtersFromStore.skip += filtersFromStore.limit;
    dispatch(getProductsAction(filtersFromStore));
  };

  const hasSearchText = () => {
    return (
      filtersFromStore &&
      filtersFromStore._keyword &&
      filtersFromStore._keyword.trim().length > 0
    );
  };

  return (
    <div className="products-list">
      {totalProduct > 0 && hasSearchText() && (
        <div className="pl-3 pt-3">
          <h2>
            {t("LABEL_RESULT")}
            {totalProduct +
              " " +
              t(
                totalProduct > 1
                  ? "LABEL_SHOP_CART_ITEMS"
                  : "LABEL_SHOP_CART_ITEM"
              )}
          </h2>
        </div>
      )}
      {products && products.length > 0 && (
        <Row>
          {products.map((item, index) => (
            <div className="wrap" key={index}>
              <Product key={item._id} item={item} />
            </div>
          ))}
        </Row>
      )}
      {products !== null && products.length === 0 && (
        <Row className="justify-content-center">{t("LABEL_NO_RESULT")}</Row>
      )}
      <Row className="m-0 w-100 d-flex justify-content-center">
        {isLoading ? (
          <Spinner style={{ color: "black" }} className="mt-3 mb-1" />
        ) : (
          hasMore && (
            <button
              onClick={handleLoadMore}
              type="button"
              className="btn load-more mt-1 mb-1"
            >
              {t("LABEL_LOAD_MORE_BTN")}
            </button>
          )
        )}
      </Row>
      {runLazyLoadingProcess()}
    </div>
  );
};

export default ProductsList;
