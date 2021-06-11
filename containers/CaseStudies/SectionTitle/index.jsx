import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const SectionTitle = ({
  alignLeft,
  title,
  description,
}) => (
  <Fragment>
    <h2 className={cn(styles.title, { [styles.titleIndent]: description })}>
      {title}
    </h2>
    {description && (
      <p className={cn(styles.description, { [styles.alignLeft]: alignLeft })}>
        {description}
      </p>
    )}
  </Fragment>
);

SectionTitle.defaultProps = {
  alignLeft: false,
  description: '',
};

SectionTitle.propTypes = {
  alignLeft: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SectionTitle;
