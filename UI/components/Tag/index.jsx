import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { TAGS_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Tag = ({
  displayName,
  type,
  onClick,
  selected,
  className,
  disabled,
  isSecondary,
}) => {
  const isSecondaryTags = TAGS_TYPE.category !== type && isSecondary;
  const isPrimaryTags = TAGS_TYPE.category !== type && !isSecondary;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        styles.selectorElement,
        styles[type],
        {
          [styles.selected]: selected,
          [styles.primary]: isPrimaryTags,
          [styles.secondary]: isSecondaryTags,
        },
        className,
      )}
    >
      {displayName}
    </button>
  );
};

Tag.defaultProps = {
  selected: false,
  disabled: false,
  isSecondary: false,
  className: '',
};

Tag.propTypes = {
  displayName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isSecondary: PropTypes.bool,
};

export default Tag;
