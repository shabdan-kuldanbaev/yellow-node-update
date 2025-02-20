import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const InformationMessage = ({ isAppear }) => (
  <span className={cn(styles.message, { [styles.appear]: isAppear })}>
    Mere formality, agree to our Privacy Policy to send your message
  </span>
);

InformationMessage.propTypes = {
  isAppear: PropTypes.bool.isRequired,
};

export default InformationMessage;
