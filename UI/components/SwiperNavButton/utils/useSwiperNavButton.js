export const useSwiperNavButton = ({
  buttonRef,
  type,
  text,
  className,
  ...rest
}) => {
  const svgType = (type === 'next') ? 'arrowRight' : 'arrowLeft';

  return {
    ...rest,
    buttonRef,
    type,
    text,
    svgType,
    className,
  };
};
