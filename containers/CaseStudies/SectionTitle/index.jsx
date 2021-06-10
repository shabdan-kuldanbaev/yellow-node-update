import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const SectionTitle = ({
  title,
  description,
}) => (
  <Fragment>
    <h2 className={cn(styles.title, { [styles.titleIndent]: description })}>
      {title}
    </h2>
    {description && (
      <p className={styles.description}>
        {description}
      </p>
    )}
  </Fragment>
);

SectionTitle.defaultProps = {
  description: '',
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SectionTitle;
