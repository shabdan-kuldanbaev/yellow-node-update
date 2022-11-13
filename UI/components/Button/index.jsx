import PropTypes from 'prop-types';
import useButton from './utils/useButton';

const Button = (props) => {
  const {
    Component,
    children,
    ...restProps
  } = useButton(props);

  return (
    <Component {...restProps}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  dark: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
};

export default Button;
