import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

export const usePaginator = ({
  pagesCounter,
  currentPage,
  pageSlug,
  className,
}) => {
  let [previous, next] = ['', ''];
  const { query: { slug: category }, push: navigateTo } = useRouter();

  if (currentPage > 3) previous = pagesCounter > 4 ? 'start' : '';

  if (currentPage <= (pagesCounter - 3)) next = pagesCounter > 5 ? 'next' : '';

  const pushRouter = (currentCategory, nextPage) => {
    const { path, dynamicPath } = ROUTES[pageSlug].getRoute(currentCategory, nextPage);

    window.scrollTo(0, 0);
    navigateTo(path);
  };

  const handleOnPreviousClick = () => pushRouter(category, 1);

  const handleOnPageClick = ({ selected }) => pushRouter(category, selected + 1);

  return {
    previous,
    next,
    pagesCounter,
    currentPage,
    className,
    handleOnPageClick,
    handleOnPreviousClick,
  };
};
