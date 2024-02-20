import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from './styles.module.scss';

const ButtonMore = ({
  title,
  href = '',
  dynamicRouting = '',
  buttonStyle = null,
  handleOnClick = null,
  buttonRef = null,
  isDisabled = false,
  disabledButtonStyle = null,
  type = '',
  ...rest
}) => (!href.length ? (
  <div
    ref={buttonRef}
    className={cn({ [buttonStyle]: buttonStyle })}
    onClick={handleOnClick}
    role="button"
    tabIndex="0"
    {...rest}
  >
    {title}
  </div>
) : (
  <LinkWrapper
    isLocalLink
    path={href}
    dynamicRouting={dynamicRouting}
    className={cn(
      styles.link,
      styles[type],
      { [disabledButtonStyle]: isDisabled },
    )}
    {...rest}
  >
    <div
      className={cn({ [buttonStyle]: buttonStyle })}
      onClick={handleOnClick}
      role="button"
      tabIndex="0"
    >
      {title}
    </div>
  </LinkWrapper>
));

ButtonMore.propTypes = {
  href: PropTypes.string,
  dynamicRouting: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]),
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  type: PropTypes.string,
  handleOnClick: PropTypes.func,
  buttonRef: PropTypes.instanceOf(Object),
  isDisabled: PropTypes.bool,
  disabledButtonStyle: PropTypes.string,
};

export default ButtonMore;
