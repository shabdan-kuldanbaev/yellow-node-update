import { useRouter } from 'next/navigation';

export const useBurger = ({
  isLightTheme,
  isMobileMenuOpened,
  handleOnClick,
  isPageScrolledDown,
}) => {
  const { asPath } = useRouter();

  return {
    asPath,
    isLightTheme,
    isMobileMenuOpened,
    handleOnClick,
    isPageScrolledDown,
  };
};
