import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const SectionTitle = ({
  type,
  title,
  description,
}) => (
  <Fragment>
    <div className={styles[type]}>
      <h2 className={cn(styles.title, { [styles.titleIndent]: description })}>
        {title}
      </h2>
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  </Fragment>
);

SectionTitle.defaultProps = {
  type: '',
  description: '',
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SectionTitle;
