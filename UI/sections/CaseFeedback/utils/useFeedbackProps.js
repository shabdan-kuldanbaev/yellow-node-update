export default ({ data, type }) => {
  const {
    title,
    secondTitle,
    isSliderBudget,
  } = data;

  return {
    type,
    title,
    secondTitle,
    isSliderBudget,
  };
};
