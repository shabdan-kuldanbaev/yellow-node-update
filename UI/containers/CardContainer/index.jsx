import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import useCardContainer from './utils/useCardContainer';

const CardContainer = (props, ref) => {
  const {
    children,
    className,
    ...restProps
  } = useCardContainer(props);

  return (
    <div
      className={className}
      ref={ref}
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

export default forwardRef(CardContainer);
