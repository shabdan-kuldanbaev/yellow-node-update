import PropTypes from 'prop-types';
import useCardContainer from './utils/useCardContainer';

const CardContainer = (props) => {
  const {
    children,
    className,
    ...restProps
  } = useCardContainer(props);

  return (
    <div
      className={className}
      {...restProps}
    >
      {children}
    </div>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  noBackground: PropTypes.bool,
  className: PropTypes.string,
};

export default CardContainer;
