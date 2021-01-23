import React from "react";
import Slider from "react-slick";
import { LazyImage } from "../../utils/LazyImage";

const SimpleSlider = ({ items }) => {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {items &&
        items.map((image, index) => {
          return (
            <LazyImage key={index} newImageSrc={image} alt="placeholder" />
          );
        })}
    </Slider>
  );
};

export default SimpleSlider;
