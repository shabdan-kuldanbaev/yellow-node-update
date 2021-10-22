import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonMore from 'components/Common/ButtonMore';
import styles from './styles.module.scss';

export const FieldsWrapper = ({
  animated: { field },
  title,
  description,
  slug,
}) => {
  switch (field) {
  case 'title':
    return (
      <h1 className={styles.h1}>
        {title}
      </h1>
    );
  case 'description':
    return (
      <Fragment>
        <p className={styles.p}>
          {description}
        </p>
        { // TODO delete slug&&: when created ubi.chat page
          slug && (
            <ButtonMore
              href={slug}
              title="View case"
              buttonStyle={styles.viewButton}
            />
          )
        }
      </Fragment>
    );
  default:
    return null;
  }
};

FieldsWrapper.defaultProps = {
  slug: '',
};

FieldsWrapper.propTypes = {
  animated: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
};
