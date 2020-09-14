import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { selectIsPageLoading } from 'redux/selectors/layout';
import { LinkWrapper } from 'components';
import { menuList } from './utils/data';
import styles from './styles.module.scss';

const Nav = ({
  theme,
  currentPage,
  isAdditional,
  isHeader,
  isPageLoading,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');

  return (
    <ul className={cn(styles.desktopMenu, {
      [styles.additionalNav]: !isBlog && (isAdditional || (currentPage && currentPage !== '')),
      [styles.additionalNavForBlog]: isBlog,
      [styles.navAppearing]: isPageLoading,
    })}
    >
      {menuList && menuList.map((item) => (
        <li key={`menuItem/${item.name}`} className={styles[theme]}>
          <LinkWrapper path={item.href} isLocalLink>
            <span className={cn(
              styles.underline,
              // TODO { [styles.activeNav]: isHeader && asPath.includes(item.name.toLowerCase()) },
            )}
            >
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
  isAdditional: PropTypes.bool.isRequired,
  isHeader: PropTypes.bool,
  isPageLoading: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isPageLoading: selectIsPageLoading(state) }),
)(Nav);
