import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { menuList } from './utils/data';
import styles from './styles.module.scss';
import cn from 'classnames';
import { useRouter } from  'next/router';

const Nav = ({
  theme,
  currentPage,
  isAdditional,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');
  const ulStyles = cn({
    [styles.desktopMenu]: true,
    [styles.additionalNav]: !isBlog && (isAdditional || currentPage && currentPage !== ''),
    [styles.additionalNavForBlog]: isBlog,
  })

  return (
    <ul className={ulStyles}>
      {menuList && menuList.map(item => (
        <li key={`menuItem/${item.name}`} className={styles[theme]}>
          <Link href={item.href}>
            <span onClick="" className={cn(styles.underline, {
              [styles.activeNav]: asPath.includes(item.name.toLowerCase())
            })}>
              {item.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

Nav.defaultProps = {
  theme: 'dark',
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
};

export default Nav;
