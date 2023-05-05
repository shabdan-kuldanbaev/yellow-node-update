import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SubMenuItem from 'UI/sections/Header/SubMenuItem';
import { ANIMATED_TYPE } from 'utils/constants';
import { useSmallDropDownMenu } from './utils/useSmallDropDownMenu';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const SmallDropDownMenu = (props) => {
  const {
    isLightTheme,
    isPageScrolledDown,
    isDropMenuOpened,
    subNavigationLinks,
    handleOnLinkClick,
  } = useSmallDropDownMenu(props);

  return (
    <div className={cn(styles.smallDropDownMenu, {
      [styles.lightTheme]: isLightTheme,
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.closed]: !isDropMenuOpened,
    })}
    >
      <div className={cn(styles.container)}>
        {subNavigationLinks.map(({ title, subtitle, slug }) => (
          <Animated
            type={ANIMATED_TYPE.isFade}
            key={slug}
            open
          >
            <SubMenuItem
              key={`link/${title}`}
              isLightTheme={isLightTheme}
              isPageScrolledDown={isPageScrolledDown}
              isTitleNormalWeight
              closeMobileMenu={() => {}}
              handleOnClick={handleOnLinkClick}
              subtitle={subtitle}
              title={title}
              subMenuSlug={slug}
            />
          </Animated>
        ))}
      </div>
    </div>
  );
};

SmallDropDownMenu.propTypes = {
  slug: PropTypes.string.isRequired,
  isLightTheme: PropTypes.bool.isRequired,
  isPageScrolledDown: PropTypes.bool.isRequired,
  isDropMenuOpened: PropTypes.bool.isRequired,
  closeDropDownMenu: PropTypes.func,
};

export default SmallDropDownMenu;
