import PropTypes from 'prop-types';
import Svg from 'UI/components/Svg';
import CardContainer from 'UI/containers/CardContainer';
import useCheckWithText from './utils/useCheckWithText';
import styles from './CheckWithText.module.scss';

const CheckWithText = (props) => {
  const {
    children,
    className,
  } = useCheckWithText(props);

  return (
    <CardContainer className={className}>
      <Svg
        type="checkFilled"
        className={styles.checkMark}
      />
      <p className={styles.title}>
        {children}
      </p>
    </CardContainer>
  );
};

CheckWithText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CheckWithText;
