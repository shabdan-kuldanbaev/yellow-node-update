import PropTypes from 'prop-types';
import CardContainer from 'UI/containers/CardContainer';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { TYPOGRAPHY_SIZE } from 'utils/constants';
import useCheckWithText from './utils/useNumberWithText';
import styles from './NumberWithText.module.scss';

const NumberWithText = (props) => {
  const {
    children,
    className,
    value,
  } = useCheckWithText(props);

  return (
    <CardContainer className={className}>
      <Typography
        variant={TYPOGRAPHY_TAGS.span}
        size={TYPOGRAPHY_SIZE.headlineM}
        className={styles.number}
        isBold
      >
        {value}
      </Typography>
      <Typography
        className={styles.text}
        variant={TYPOGRAPHY_TAGS.p}
        size={TYPOGRAPHY_SIZE.paragrapghM}
      >
        {children}
      </Typography>
    </CardContainer>
  );
};

NumberWithText.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default NumberWithText;
