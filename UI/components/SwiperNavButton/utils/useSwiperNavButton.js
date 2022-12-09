export const useSwiperNavButton = ({
  buttonRef,
  type,
  text,
  className,
}) => {
  const svgType = (type === 'next') ? 'arrowRight' : 'arrowLeft';

  return {
    buttonRef,
    type,
    text,
    svgType,
    className,
  };
};
