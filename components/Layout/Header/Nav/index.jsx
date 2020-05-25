import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import cn from 'classnames';
import { useRouter } from 'next/router';
// import { connect } from 'react-redux';
// import { selectIsFirstVisit } from 'redux/selectors/blog';
import { menuList } from './utils/data';
import styles from './styles.module.scss';

const Nav = ({
  theme,
  currentPage,
  isAdditional,
  isHeader,
  // isFirstVisitBlog,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');

  return (
    <ul className={cn(styles.desktopMenu, {
      [styles.additionalNav]: !isBlog && (isAdditional || (currentPage && currentPage !== '')),
      [styles.additionalNavForBlog]: isBlog,
      // [styles.additionalNav]: !isFirstVisitBlog && (isAdditional || (currentPage && currentPage !== '')),
      // [styles.additionalNavForBlog]: isFirstVisitBlog,
    })}
    >
      {menuList && menuList.map((item) => (
        <li key={`menuItem/${item.name}`} className={styles[theme]}>
          <LinkWrapper path={item.href} isLocalLink>
            <span className={cn(styles.underline, { [styles.activeNav]: isHeader && asPath.includes(item.name.toLowerCase()) })}>
              {item.name}
            </span>
          </LinkWrapper>
        </li>
      ))}
    </ul>
  );
};

Nav.defaultProps = {
  theme: 'dark',
  isHeader: false,
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  isAdditional: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  // isFirstVisitBlog: PropTypes.bool.isRequired,
};

export default Nav;

// const mapStateToProps = (state) => ({ isFirstVisitBlog: selectIsFirstVisit(state) });

// export default connect(mapStateToProps)(Nav);
