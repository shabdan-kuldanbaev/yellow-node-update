import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'store/selectors/layout';
import LinkWrapper from 'UI/components/LinkWrapper';
import useAppearingAnimation from 'hooks/useAppearingAnimation';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const IntroText = ({ className }) => {
  const isMobileResolution = useSelector(selectIsMobile);
  const [direction, isTopOfPage] = useAppearingAnimation(isMobileResolution);

  return (
    <div
      className={cn(
        'intro-text',
        styles.introTextContainer,
        className,
        styles[direction],
        {
          [styles.notOnTop]: !isTopOfPage,
        },
      )}
    >
      <p className={styles.introText}>
        For Y Combinator startups, Fortune 500 companies, and you.&nbsp;
      </p>
      <LinkWrapper
        isLocalLink
        path={ROUTES.contact.path}
        dynamicRouting={ROUTES.contact.dynamicPath}
        className={styles.introLink}
      >
        Get in touch
      </LinkWrapper>
    </div>
  );
};

IntroText.propTypes = {
  className: PropTypes.string,
};

export default IntroText;
