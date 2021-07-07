import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { FieldsWrapper } from './FieldsWrapper';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const CompanyContacts = ({ animatedFieldsList }) => (
  <address className={styles.address}>
    {animatedFieldsList && animatedFieldsList.map((animated) => (
      <Animated
        {...animated}
        key={`fields/${animated.field}`}
      >
        <FieldsWrapper animated={animated} />
      </Animated>
    ))}
  </address>
);

CompanyContacts.defaultProps = {
  animatedFieldsList: animatedFields,
};

CompanyContacts.propTypes = {
  animatedFieldsList: PropTypes.instanceOf(Array),
};
