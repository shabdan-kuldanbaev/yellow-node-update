export const usePaginator = ({
  pagesCounter,
  currentPage,
  className,
  onPageChange,
}) => {
  let [previous, next] = ['', ''];

  if (currentPage > 3) previous = pagesCounter > 4 ? 'start' : '';

  if (currentPage <= (pagesCounter - 3)) next = pagesCounter > 5 ? 'next' : '';

  const handleOnPreviousClick = () => onPageChange(1);

  const handleOnPageClick = ({ selected }) => onPageChange(selected + 1);

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
