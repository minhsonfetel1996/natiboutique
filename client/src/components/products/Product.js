import React, { useState } from "react";
import { Row } from "reactstrap";
import { LazyImage } from "../../utils/LazyImage";
import ProductPrices from "./ProductPrices";

const Product = ({ item }) => {
  const [customItem] = useState(item);
  const [newImageSrc, setNewImageSrc] = useState(null);

  const onColorWayClicked = (colorwayImg) => {
    setTimeout(() => {
      setNewImageSrc(null);
    });
    setTimeout(() => {
      setNewImageSrc(colorwayImg.replace("144", "1280"));
    });
  };

  const getImageDataForMainProduct = (images) => {
    return images && images.length > 0
      ? images.filter((image) => image && image.length > 0)[0]
      : customItem.color_ways && customItem.color_ways.length > 0
      ? customItem.color_ways[0].replace("144", "1280")
      : null;
  };

  return (
    <div className="product">
      <a href={`/products/${customItem._id}`} className="fade-in">
        {!newImageSrc && (
          <LazyImage
            title={customItem.title}
            dataSrc={getImageDataForMainProduct(customItem.images)}
            dataSrcset={getImageDataForMainProduct(customItem.images)}
            alt={customItem.title}
            fitSize={false}
          />
        )}
        {newImageSrc && (
          <LazyImage
            title={customItem.title}
            dataSrc={newImageSrc}
            dataSrcset={newImageSrc}
            alt={customItem.title}
            newImageSrc={newImageSrc}
            fitSize={true}
          />
        )}
      </a>
      {customItem.color_ways && (
        <Row className="product-card__colorways">
          {customItem.color_ways.map((colorwayImg, index) => {
            return (
              <div
                key={index}
                className="product-card__colorways_item"
                onClick={(event) => {
                  event.preventDefault();
                  onColorWayClicked(colorwayImg);
                }}
              >
                <LazyImage
                  title={customItem.title}
                  dataSrc={colorwayImg}
                  dataSrcset={colorwayImg}
                  alt={customItem.title}
                  width="55"
                  height="55"
                  newImageSrc={colorwayImg}
                  thumbnail={true}
                />
              </div>
            );
          })}
        </Row>
      )}
      <div className="info">
        <h3 className="title">{customItem.title}</h3>
        <div className="product-card__wrapper">
          <ProductPrices price={customItem.price} />
        </div>
      </div>
    </div>
  );
};

export default Product;
