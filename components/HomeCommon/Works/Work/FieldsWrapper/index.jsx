import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ButtonMore from 'components/Common/ButtonMore';
import styles from './styles.module.scss';

export const FieldsWrapper = ({
  animated: { field },
  title,
  description,
  slug,
  type,
}) => {
  switch (field) {
  case 'title':
    return (
      <h2 className={cn(styles.h2, styles[type])}>
        {title}
      </h2>
    );
  case 'description':
    return (
      <Fragment>
        <p className={cn(styles.p, styles[type])}>
          {description}
        </p>
        { // TODO delete slug&&: when created ubi.chat page
          slug && (
            <ButtonMore
              href={slug}
              title="View case"
              type="home"
              buttonStyle={cn(styles.viewButton, styles[type])}
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
  type: '',
};

FieldsWrapper.propTypes = {
  animated: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
  type: PropTypes.string,
};
