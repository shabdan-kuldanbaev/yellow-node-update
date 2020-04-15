import React, { useState } from 'react';
import { tags } from './utils/data';
import styles from './styles.module.scss';
import { LinkWrapper, ButtonMore } from 'components';
import SearchIcon from './images/search.svg';
import Search from '../Search';
import cn from 'classnames';

const LineOfSelect = ({ urlPath }) => {
  const [isSearch, setSearch] = useState(false);
  const openSearch = () => setSearch(true);
  const closeSearch = () => setSearch(false);

  return (
    <div className={styles.selectionBlock}>
      <ul>
        {tags.map((tag) => (
          <li key={tag.name} className={cn({ [styles.selectedBlock]: urlPath.includes(tag.dynamicRouting) })}>
            <LinkWrapper
              isLocalLink
              dynamicRouting={`/blog?category=${tag.dynamicRouting}&page=1`}
              path={`/blog?category=${tag.dynamicRouting}&page=1`}
            >
              {tag.name}
            </LinkWrapper>
          </li>
        ))}
      </ul>
      <div>
        <img
          src={SearchIcon}
          alt="Search"
          onClick={openSearch}
        />
        <ButtonMore
          handleOnClick=""
          href="/"
          title="Subscribe"
          buttonStyle={styles.button}
        />
      </div>
      <Search
        isSearch={isSearch}
        closeSearch={closeSearch}
      />
    </div>
  );
};

export default LineOfSelect;