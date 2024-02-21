import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const SubMenuItem = ({
  handleOnClick,
  isLightTheme,
  isPageScrolledDown,
  title,
  subtitle = '',
  subMenuSlug = '',
  isTitleNormalWeight,
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
      className={cn(
        styles.link,
        styles.title,
        { [styles.titleNotBold]: isTitleNormalWeight },
      )}
    >
      <>
        {title}
        {subtitle && (
          <Typography
            variant="span"
            className={styles.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </>
    </LinkWrapper>
  </div>
);

SubMenuItem.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subMenuSlug: PropTypes.string,
};

export default SubMenuItem;
