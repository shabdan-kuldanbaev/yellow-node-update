import { useCallback } from 'react';

export const useSelector = ({
  view,
  type,
  displayNames,
  selectedIndex,
  onSelectedIndexChange,
}) => {
  const handleSelectedIndexChange = useCallback(
    (i) => () => onSelectedIndexChange(i),
    [onSelectedIndexChange],
  );

  return {
    view,
    type,
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  };
};
