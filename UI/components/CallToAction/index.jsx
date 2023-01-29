import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'UI/components/Button';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const CallToAction = (props) => {
  const {
    titles,
    subtitle,
    buttonTitle,
    href,
    type,
    page,
    view,
    handleOnClick,
    className,
    images,
    isNew,
  } = useProps(props);

  return (
    <div
      className={cn(
        styles[type],
        styles[view],
        styles[page],
        className,
        {
          [styles.new]: isNew,
        },
      )}
    >
      {images.map(({ url, alt }, i) => (
        <Illustration
          src={url}
          alt={alt}
          className={cn(styles.image, styles[`image-${i}`])}
        />
      ))}

      <div className={styles.content}>
        {titles?.map((titleText, index) => (
          titleText && (
            <Typography
              variant={TYPOGRAPHY_TAGS.h3}
              size={TYPOGRAPHY_SIZE.headline24}
              className={cn(styles.h3, styles.title)}
              key={`titleText/${index}`}
            >
              {titleText}
            </Typography>
          )
        ))}
        {subtitle && (
          <Typography
            variant={TYPOGRAPHY_TAGS.p}
            className={cn(styles.p, styles.subtitle)}
          >
            {subtitle}
          </Typography>
        )}
      </div>

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
};

CallToAction.defaultProps = {
  href: '',
  handleOnClick: () => {},
  className: '',
  title: '',
  subtitle: '',
  data: {},
};

CallToAction.propTypes = {
  data: PropTypes.instanceOf(Object), // It's preferred to pass CTA data with single AS_IS entry. not separate fields
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonTitle: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  handleOnClick: PropTypes.func,
  className: PropTypes.string,
};

export default CallToAction;
