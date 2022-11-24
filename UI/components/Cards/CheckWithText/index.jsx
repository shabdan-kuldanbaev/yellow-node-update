import PropTypes from 'prop-types';
import Svg from 'UI/components/Svg';
import CardContainer from 'UI/containers/CardContainer';
import useCheckWithText from './utils/useCheckWithText';

const CheckWithText = (props) => {
  const {
    children,
    className,
  } = useCheckWithText(props);

  return (
    <CardContainer className={className}>
      <Svg type="checkFilled" />
      {children}
    </CardContainer>
  );
};

CheckWithText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CheckWithText;
