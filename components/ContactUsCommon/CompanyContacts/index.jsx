import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { FieldsWrapper } from './FieldsWrapper';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CompanyContacts = ({ animatedFieldsList }) => (
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

export default CompanyContacts;
