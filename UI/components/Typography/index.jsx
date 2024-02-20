import PropTypes from 'prop-types';
import { TYPOGRAPHY_SIZE, useTypography, TYPOGRAPHY_TAGS } from './utils/useTypography';

const Typography = (props) => {
  const {
    Tag,
    classes,
    children,
    onClick,
    tabIndex,
    role,
    ...rest
  } = useTypography(props);

  return (
    <Tag
      className={classes}
      onClick={onClick}
      tabIndex={tabIndex}
      role={role}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  isBold: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(TYPOGRAPHY_SIZE)),
  mobileSize: PropTypes.oneOf(Object.values(TYPOGRAPHY_SIZE)),
  onClick: PropTypes.func,
  tabIndex: PropTypes.string,
  role: PropTypes.string,
};

export default Typography;
