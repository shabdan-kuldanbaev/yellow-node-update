import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { ROUTES } from 'utils/constants';

export const usePaginator = ({
  arrows: navigationArrows,
  pagesCounter,
  currentPage,
  pageSlug,
  className,
}) => {
  let [previous, next] = ['', ''];
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const { query: { slug: category } } = useRouter();

  if (currentPage > 3) previous = pagesCounter > 4 ? 'start' : '';

  if (currentPage <= (pagesCounter - 3)) next = pagesCounter > 5 ? 'next' : '';

  const pushRouter = (currentCategory, nextPage) => {
    const { path, dynamicPath } = ROUTES[pageSlug].getRoute(currentCategory, nextPage);

    window.scrollTo(0, 0);
    Router.push(
      { pathname: dynamicPath },
      { pathname: path },
    );
  };

  const handleOnPreviousClick = () => pushRouter(category, 1);

  const handleOnPageClick = ({ selected }) => pushRouter(category, selected + 1);

  return {
    previous,
    next,
    pagesCounter,
    currentPage,
    className,
    isMobileResolution,
    handleOnPageClick,
    handleOnPreviousClick,
  };
};
