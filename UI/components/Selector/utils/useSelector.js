import { useCallback } from 'react';

export const useSelector = ({
  displayNames,
  selectedIndex,
  onSelectedIndexChange,
}) => {
  const handleSelectedIndexChange = useCallback(
    (i) => () => onSelectedIndexChange(i),
    [],
  );

  return {
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  };
};
