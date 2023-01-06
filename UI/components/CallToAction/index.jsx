import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'UI/components/Button';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import styles from './styles.module.scss';

const CallToAction = ({
  title,
  subtitle,
  buttonTitle,
  href,
  type,
  page,
  view,
  handleOnClick,
  className,
}) => (
  <div
    className={cn(
      styles[type],
      styles[view],
      styles[page],
      className,
    )}
  >
    <Typography
      variant={TYPOGRAPHY_TAGS.h3}
      size={TYPOGRAPHY_SIZE.headline24}
      className={styles.h3}
    >
      {title}
    </Typography>

    {subtitle && (
      <Typography
        variant={TYPOGRAPHY_TAGS.p}
        className={styles.p}
      >
        {subtitle}
      </Typography>
    )}

    <Button
      href={href}
      onClick={handleOnClick}
      className={styles.button}
      data-button
    >
      {buttonTitle}
    </Button>
  </div>
);

CallToAction.defaultProps = {
  href: '',
  handleOnClick: () => {},
  className: '',
  title: '',
  subtitle: '',
};

CallToAction.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
  className: PropTypes.string,
};

export default CallToAction;
