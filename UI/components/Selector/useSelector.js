export const useSelector = ({ displayNames, selectedIndex, onSelectedIndexChange }) => {
  const handleSelectedIndexChange = (i) => () => onSelectedIndexChange(i);

  return {
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  };
};
