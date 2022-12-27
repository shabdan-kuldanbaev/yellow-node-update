export default (index, array, isMobileResolution) => {
  if (index === array.length - 1) return [];

  const rightArrow = [
    {
      targetId: `element${index + 2}`,
      targetAnchor: 'left',
      sourceAnchor: 'right',
    },
  ];

  const bottomArrow = [
    {
      targetId: `element${index + 2}`,
      targetAnchor: 'top',
      sourceAnchor: 'bottom',
    },
  ];

  if (isMobileResolution) return bottomArrow;

  return (index + 1) % 3 === 0
    ? bottomArrow
    : rightArrow;
};
