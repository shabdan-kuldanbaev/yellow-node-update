import PropTypes from 'prop-types';
import useCardOverlay from './utils/useOverlay';

const Overlay = (props) => {
  const {
    className,
    children,
    ...restProps
  } = useCardOverlay(props);

  return (
    <div
      className={className}
      {...restProps}
    >
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Overlay;
