import React from "react";
import { formatPrice } from "../../utils/AppUtils";

const ProductPrices = ({ price }) => {
  if (!price) {
    return null;
  }
  price.discounted = price.currentPrice < price.oldPrice;
  return (
    <>
      <div
        className={
          price.discounted
            ? "product-price reduced"
            : "product-price is-current-price"
        }
      >
        {formatPrice(price.oldPrice)}
      </div>
      {price.discounted && (
        <div className="product-price is-current-price sale-price">
          {formatPrice(price.currentPrice)}
        </div>
      )}
    </>
  );
};

export default ProductPrices;
