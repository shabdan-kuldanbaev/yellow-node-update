import React from 'react';
import ButtonMore from 'components/Common/ButtonMore';
import LinkWrapper from 'components/Common/LinkWrapper';
import cn from 'classnames';
import { menuList } from 'UI/sections/Header/Nav/utils/data';
import styles from './styles.module.scss';

export const OldFooterEmail = () => (
  <dvi className={styles.oldFooterEmail}>
    <span>Email:</span>
    <span>
      <LinkWrapper path="mailto:hi@yellow.systems" isLocalLink>
        hi@yellow.systems
      </LinkWrapper>
    </span>
  </dvi>
);

export const DesktopMenu = () => (
  <ul className={styles.desktopMenu}>
    {menuList && menuList.map((item, index, currentArray) => (
      <li key={`menuItem/${item.name}`} className={styles.dark}>
        <LinkWrapper path={item.href} isLocalLink>
          {index === currentArray.length - 1 && (
            <svg viewBox="0 0 115.2 41">
              <rect rx="20" ry="30" />
            </svg>
          )}
          <span className={cn(styles.underline)}>
            {item.name}
          </span>
        </LinkWrapper>
      </li>
    ))}
  </ul>
);

export const ButtonOverlap = () => (
  <ButtonMore
    href="/portfolio"
    title="Explore our portfolio"
    buttonStyle={styles.buttonOverlap}
  />
);
