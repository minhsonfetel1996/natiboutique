import React, { useState } from "react";
import styled from "styled-components";
import { initDataSrcSet } from "./ImageUtils";
const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const Image = styled.img`
  display: block;

  // Add a smooth animation on loading
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }

  // I use utilitary classes instead of props to avoid style regenerating
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
  }

  &.has-error {
    // fallback to placeholder image on error
    content: url(${placeHolder});
  }
`;

export const LazyImage = ({
  title,
  dataSrc,
  dataSrcset,
  alt,
  newImageSrc,
  fitSize,
  thumbnail,
  width,
  height,
}) => {
  const [imageSrc] = useState(newImageSrc || placeHolder);

  const onLoad = (event) => {
    event.target.classList.add("loaded");
  };

  const onError = (event) => {
    event.target.classList.add("has-error");
  };

  return (
    <Image
      key={title}
      title={title}
      className="img lazy"
      src={imageSrc}
      data-src={fitSize ? initDataSrcSet(dataSrc) : dataSrc}
      data-srcset={fitSize ? initDataSrcSet(dataSrcset) : dataSrcset}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      thumbnail={thumbnail}
      width={width}
      height={height}
    />
  );
};
