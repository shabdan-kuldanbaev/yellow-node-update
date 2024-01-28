import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'UI/components/Svg';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const SubMenuItem = ({
  handleOnClick,
  isLightTheme,
  isPageScrolledDown,
  title,
  path,
  icon,
  items,
  slug,
}) => (
  <div
    className={cn(
      styles.container,
      styles[slug],
      {
        [styles.lightTheme]: isLightTheme,
        [styles.pageScrolling]: isPageScrolledDown,
      },
    )}
    onClick={handleOnClick}
    role="button"
    tabIndex="0"
  >
    <div className={styles.mainWrapper}>
      {icon && (
        <Svg
          type={icon}
          className={styles.icon}
        />
      )}
      {path ? (
        <LinkWrapper
          isLocalLink
          path={path}
          className={styles.link}
        >
          {title}
        </LinkWrapper>
      )
        : (
          <Typography className={styles.title}>
            {title}
          </Typography>
        )}
    </div>
    {!!items?.length && (
      <div className={cn(styles.itemsWrapper)}>
        {items.map(({
          path: itemPath,
          title: itemTitle,
          icon: itemIcon,
        }) => (
          <div className={styles.itemWrapper}>
            {itemIcon && (
              <Svg
                type={itemIcon}
                className={styles.itemIcon}
              />
            )}
            <LinkWrapper
              isLocalLink
              path={itemPath}
              className={styles.itemLink}
            >
              {itemTitle}
            </LinkWrapper>
          </div>
        ))}
      </div>
    )}
  </div>
);

SubMenuItem.defaultProps = {
  path: '',
};

SubMenuItem.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default SubMenuItem;
