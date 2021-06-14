import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'next/router';
import { Svg } from 'components/Common/Svg';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { socialNetworks } from './utils/data';
import styles from './styles.module.scss';

const CaseStudiesFooter = ({ router }) => {
  const { query: { project } } = router;

  return (
    <footer className={cn(styles.container, styles[project])}>
      <div className={styles.nextProjectContainer}>
        <p className={styles.subtitle}>
          Next project
        </p>
        <p className={styles.projectName}>
          Fairy tales
        </p>
        <LinkWrapper
          href="#"
          className={styles.more}
        >
          <span className={styles.textIndent}>
            See more
          </span>
          <Svg type={SVG_IMAGES_TYPES.arrow} />
        </LinkWrapper>
      </div>
      <div className={styles.footerLinks}>
        <div>
          <p className={styles.question}>
            Not sure where to start?
          </p>
          <LinkWrapper
            path="mailto:hi@yellow.systems"
            className={styles.link}
            isLocalLink
            googleAnalyticProps={{
              action: 'Click',
              data: 'Email',
            }}
          >
            hi@yellow.systems
          </LinkWrapper>
        </div>
        <div>
          {socialNetworks.map(({
            title,
            href,
            type,
          }) => (
            <LinkWrapper
              key={`networks/${title}`}
              path={href}
              className={styles.iconLink}
              googleAnalyticProps={{
                category: 'Social',
                label: router.pathname,
                data: title,
              }}
              isSocialLink
            >
              <Svg type={type} />
            </LinkWrapper>
          ))}
        </div>
      </div>
    </footer>
  );
};

CaseStudiesFooter.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(CaseStudiesFooter);
