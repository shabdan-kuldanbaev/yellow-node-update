import PropTypes from 'prop-types';
import Svg from 'UI/components/Svg';
import CardContainer from 'UI/containers/CardContainer';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { TYPOGRAPHY_SIZE } from 'utils/constants';
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
      <Typography
        className={styles.title}
        variant={TYPOGRAPHY_TAGS.span}
        size={TYPOGRAPHY_SIZE.headlineS}
        isBold
      >
        {children}
      </Typography>
    </CardContainer>
  );
};

CheckWithText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CheckWithText;
