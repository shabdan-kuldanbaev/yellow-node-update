import { useCallback } from 'react';

export const useSelector = ({
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
    type,
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  };
};
