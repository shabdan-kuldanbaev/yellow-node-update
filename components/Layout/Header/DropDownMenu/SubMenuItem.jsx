import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import styles from './styles.module.scss';

const SubMenuItem = ({
  closeMobileMenu,
  handleOnClick,
  title,
  subtitle,
  items,
  subMenuSlug,
}) => (
  <div
    className={styles.itemContainer}
    onClick={handleOnClick}
    role="button"
    tabIndex="0"
  >
    <LinkWrapper
      isLocalLink
      path={subMenuSlug}
      className={styles.link}
    >
      <h3 className={styles.title}>
        {title}
      </h3>
      {subtitle && (
        <span className={styles.subtitle}>
          {subtitle}
        </span>
      )}
    </LinkWrapper>
    {items?.map(({ slug: itemSlug, title: itemTitle }) => (
      <LinkWrapper
        className={styles.menuLink}
        isLocalLink
        path={itemSlug}
        key={`links/${itemTitle}`}
      >
        <span
          onClick={closeMobileMenu}
          role="button"
          tabIndex="0"
          className={styles.menuText}
        >
          {itemTitle}
        </span>
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
