import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import CardContainer from 'UI/containers/CardContainer';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import useCheckWithText from './utils/useCheckWithText';
import styles from './CheckWithText.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

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
        variant="p"
        size={TYPOGRAPHY_SIZE.headline24}
        mobileSize={TYPOGRAPHY_SIZE.paragrapgh16}
        className={styles.title}
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
