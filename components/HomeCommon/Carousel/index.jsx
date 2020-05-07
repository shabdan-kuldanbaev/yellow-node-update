import React from 'react';
import Slider from 'react-slick';
import CarouselItem from './Item';
import { nextArrow, backArrow } from './images';
import { reviews } from './utils/data';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.scss';

const Carousel = () => {
  const SampleNextArrow = ({ onClick }) => (
    <img
      className={styles.arrow}
      src={nextArrow}
      alt="next"
      onClick={onClick}
    />
  );

  const SamplePrevArrow = ({ onClick }) => (
    <img
      className={styles.arrow}
      src={backArrow}
      alt="back"
      onClick={onClick}
    />
  );

  const settings = {
    adaptiveHeight: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      {reviews.map((review) => <CarouselItem key={review.id} {...review} />)}
    </Slider>
  );
};

export default Carousel;
