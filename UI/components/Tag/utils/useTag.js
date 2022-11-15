import { TAGS_TYPE } from 'utils/constants';

export const useTag = ({
  displayName,
  type,
  onClick,
  selected,
  disabled,
  className,
  isSecondary,
}) => {
  const isSecondaryTags = TAGS_TYPE.category !== type && isSecondary;
  const isPrimaryTags = TAGS_TYPE.category !== type && !isSecondary;

  return {
    type,
    onClick,
    selected,
    disabled,
    className,
    displayName,
    isSecondary: isSecondaryTags,
    isPrimary: isPrimaryTags,
  };
};
