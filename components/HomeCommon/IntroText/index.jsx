import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const IntroText = ({ className }) => (
  <div className={cn(styles.introTextContainer, className)}>
    <p className={styles.text}>
      For Y Combinator startups, Fortune 500 companies and you.&nbsp;
    </p>
    <LinkWrapper
      isLocalLink
      path={ROUTES.contact.path}
      dynamicRouting={ROUTES.contact.dynamicPath}
    >
      {' '}
      Get in touch
    </LinkWrapper>
  </div>
);

IntroText.defaultProps = {
  className: '',
};

IntroText.propTypes = {
  className: PropTypes.string,
};
