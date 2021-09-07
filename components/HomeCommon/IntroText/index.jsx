import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const IntroText = ({ className, isMobileResolution }) => {
  const oldYRef = useRef(0);
  const [direction, setDirection] = useState('');
  const [isTopOfPage, setTopOfPage] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isMobileResolution) {
      return null;
    }

    oldYRef.current = window.pageYOffset;

    const handleOnScroll = () => {
      const { pageYOffset } = window;

      if (pageYOffset < 250) {
        setTopOfPage(true);

        if (pageYOffset < 200 && oldYRef.current > pageYOffset) {
          setDirection('up');
        }

        if (pageYOffset > 100 && oldYRef.current < pageYOffset) {
          setDirection('down');
        }
      } else {
        setTopOfPage(false);
      }

      oldYRef.current = pageYOffset;
    };

    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

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
      <p className={styles.text}>
        For Y Combinator startups, Fortune 500 companies and you.&nbsp;
      </p>
      <LinkWrapper
        isLocalLink
        path={ROUTES.contact.path}
        dynamicRouting={ROUTES.contact.dynamicPath}
      >
        Get in touch
      </LinkWrapper>
    </div>
  );
};

IntroText.defaultProps = {
  className: '',
};

IntroText.propTypes = {
  className: PropTypes.string,
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(IntroText);
