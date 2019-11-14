import React from 'react';
import Slider from 'react-slick';
import CarouselItem from './Item';
import nextArrow from './images/next-arrow.svg';
import backArrow from './images/back-arrow.svg';
import { reviews } from './utils/data';

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <Slider {...settings}>
      {reviews.map(review => <CarouselItem key={review.id} {...review} />)}
    </Slider>
  );
};

export default Carousel;
