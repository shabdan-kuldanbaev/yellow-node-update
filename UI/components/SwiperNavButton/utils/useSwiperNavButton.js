import { useSwiper } from 'swiper/react';

export const useSwiperNavButton = ({
  type,
  text,
  className,
}) => {
  const swiper = useSwiper();

  const handleNavButtonClick = () => {
    if (type === 'next') {
      return swiper.slideNext();
    }

    swiper.slidePrev();
  };

  const svgType = (type === 'next') ? 'arrowRight' : 'arrowLeft';

  return {
    type,
    text,
    svgType,
    className,
    handleNavButtonClick,
  };
};
