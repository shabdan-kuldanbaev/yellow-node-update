import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const SubMenuItem = ({
  handleOnClick,
  isLightTheme,
  isPageScrolledDown,
  title,
  subtitle,
  subMenuSlug,
}) => (
  <div
    className={cn(styles.itemContainer, {
      [styles.lightTheme]: isLightTheme,
      [styles.pageScrolling]: isPageScrolledDown,
    })}
    onClick={handleOnClick}
    role="button"
    tabIndex="0"
  >
    <LinkWrapper
      isLocalLink
      path={subMenuSlug}
      className={cn(styles.link, styles.title)}
    >
      {title}
      {subtitle && (
        <Typography
          variant="span"
          className={styles.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </LinkWrapper>
  </div>
);

SubMenuItem.defaultProps = {
  subtitle: '',
  subMenuSlug: '',
};

SubMenuItem.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subMenuSlug: PropTypes.string,
};

export default SubMenuItem;
