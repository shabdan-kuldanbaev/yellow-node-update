import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const SubMenuItem = ({
  closeMobileMenu,
  handleOnClick,
  isLightTheme,
  isPageScrolledDown,
  title,
  subtitle,
  items,
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
    {items?.map(({ slug: itemSlug, title: itemTitle }) => (
      <LinkWrapper
        className={styles.menuLink}
        isLocalLink
        path={itemSlug}
        key={`links/${itemTitle}`}
      >
        <Typography
          onClick={closeMobileMenu}
          role="button"
          tabIndex="0"
          className={styles.menuText}
        >
          {itemTitle}
        </Typography>
      </LinkWrapper>
    ))}
  </div>
);

SubMenuItem.defaultProps = {
  items: [],
  subtitle: '',
  subMenuSlug: '',
};

SubMenuItem.propTypes = {
  closeMobileMenu: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  subtitle: PropTypes.string,
  subMenuSlug: PropTypes.string,
};

export default SubMenuItem;
