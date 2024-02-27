import { usePathname } from 'next/navigation';

export const useBurger = ({
  isLightTheme,
  isMobileMenuOpened,
  handleOnClick,
  isPageScrolledDown,
}) => {
  const asPath = usePathname();

  return {
    asPath,
    isLightTheme,
    isMobileMenuOpened,
    handleOnClick,
    isPageScrolledDown,
  };
};
