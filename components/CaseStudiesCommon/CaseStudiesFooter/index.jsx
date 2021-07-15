import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProject } from 'redux/selectors/portfolio';
import { Svg } from 'components/Common/Svg';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getFooterProps } from './utils/propsHelper';
import { socialNetworks } from './utils/data';
import styles from './styles.module.scss';

const CaseStudiesFooter = ({
  type,
  pathname,
  currentProject,
}) => {
  const {
    title,
    buttonTitle,
    slug,
    footerBackgroundImage,
  } = getFooterProps(currentProject);

  const footerStyle = footerBackgroundImage ? { backgroundImage: `url(${footerBackgroundImage})` } : {};

  return (
    <footer
      className={styles[type]}
      style={footerStyle}
    >
      {slug && (
        <div className={styles.nextProjectContainer}>
          <p className={styles.subtitle}>
            Next project
          </p>
          <p className={styles.projectName}>
            {title}
          </p>
          <LinkWrapper
            path={slug}
            className={styles.more}
            isLocalLink
          >
            <span className={styles.textIndent}>
              {buttonTitle}
            </span>
            <Svg type={SVG_IMAGES_TYPES.arrow} />
          </LinkWrapper>
        </div>
      )}
      <div className={styles.footerLinks}>
        <div className={styles.emailContainer}>
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
            name,
            href,
            iconType,
          }) => (
            <LinkWrapper
              key={`networks/${name}`}
              path={href}
              className={styles.iconLink}
              googleAnalyticProps={{
                category: 'Social',
                label: pathname,
                data: name,
              }}
              isSocialLink
            >
              <Svg type={iconType} />
            </LinkWrapper>
          ))}
        </div>
      </div>
    </footer>
  );
};

CaseStudiesFooter.propTypes = {
  type: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  currentProject: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ currentProject: selectProject(state) }),
)(CaseStudiesFooter);
