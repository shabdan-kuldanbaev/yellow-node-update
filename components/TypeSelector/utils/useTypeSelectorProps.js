const useTypeSelectorProps = ({ onSelectedTypeChange, ...props }) => {
  const handleTypeChange = (type) => () => {
    onSelectedTypeChange(type);
  };

  return {
    handleTypeChange,
    ...props,
  };
};

export default useTypeSelectorProps;
