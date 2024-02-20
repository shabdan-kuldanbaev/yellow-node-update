import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const FullLayout = ({
  children,
  disableMaxWidth,
  disableTopPadding,
  disableSidePadding,
  disableBottomPadding,
  disableOverflowHiding,
  backgroundColor,
  className,
  introSection = null,
}) => {
  const layoutStyles = cn(
    className,
    styles.fullLayout,
    styles[backgroundColor],
    {
      [styles.disableMaxWidth]: disableMaxWidth,
      [styles.disableTopPadding]: disableTopPadding,
      [styles.disableSidePadding]: disableSidePadding,
      [styles.disableBottomPadding]: disableBottomPadding,
      [styles.disableOverflowHiding]: disableOverflowHiding,
    },
  );

  return (
    <div
      className={layoutStyles}
      ref={introSection}
    >
      {children}
    </div>
  );
};

FullLayout.propTypes = {
  children: PropTypes.instanceOf(Object),
  disableMaxWidth: PropTypes.bool,
  disableTopPadding: PropTypes.bool,
  disableSidePadding: PropTypes.bool,
  disableBottomPadding: PropTypes.bool,
  backgroundColor: PropTypes.string,
  introSection: PropTypes.instanceOf(Object),
};

export default FullLayout;
