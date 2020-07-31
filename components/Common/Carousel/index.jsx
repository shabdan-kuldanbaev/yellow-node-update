import React from 'react';
import Slider from 'react-slick';
import { CarouselItem } from './Item';
import { Arrow } from './Arrow';
import { nextArrow, backArrow } from './images';
import { reviews } from './utils/data';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.module.scss';

export const Carousel = () => {
  const settings = {
    adaptiveHeight: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <Arrow src={nextArrow} alt="next" />,
    prevArrow: <Arrow src={backArrow} alt="back" />,
  };

  return (
    <Slider {...settings}>
      {reviews.map((review) => <CarouselItem key={review.id} {...review} />)}
    </Slider>
  );
};
