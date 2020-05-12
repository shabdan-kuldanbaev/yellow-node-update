import React from 'react';
import Slider from 'react-slick';
import { CarouselItem } from './Item';
import { nextArrow, backArrow } from './images';
import { reviews } from './utils/data';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.scss';

const Arrow = ({
  src,
  alt,
  onClick,
}) => (
  <img
    src={src}
    alt={alt}
    onClick={onClick}
    className={styles.arrow}
  />
);

export const Carousel = () => {
  const settings = {
    adaptiveHeight: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow src={nextArrow} alt="next" />,
    prevArrow: <Arrow src={backArrow} alt="back" />,
  };

  return (
    <Slider {...settings}>
      {reviews.map((review) => <CarouselItem key={review.id} {...review} />)}
    </Slider>
  );
};
