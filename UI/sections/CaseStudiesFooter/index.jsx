import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProject } from 'redux/selectors/portfolio';
import Svg from 'UI/components/Svg';
import LinkWrapper from 'UI/components/LinkWrapper';
import Typography from 'UI/components/Typography';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { socialNetworks } from './utils/data';
import { useCaseStudiesFooter } from './utils/useCaseStudiesFooter';
import styles from './styles.module.scss';

const CaseStudiesFooter = (props) => {
  const {
    type,
    title,
    buttonTitle,
    slug,
    pathname,
    footerStyle,
  } = useCaseStudiesFooter(props);

  return (
    <footer
      className={styles[type]}
      style={footerStyle}
    >
      {slug && (
        <div className={styles.nextProjectContainer}>
          <Typography
            variant="p"
            className={styles.subtitle}
          >
            Next project
          </Typography>
          <Typography
            variant="p"
            className={styles.projectName}
          >
            {title}
          </Typography>
          <LinkWrapper
            path={slug}
            className={styles.more}
            isLocalLink
          >
            <Typography className={styles.textIndent}>
              {buttonTitle}
            </Typography>
            <Svg type={SVG_IMAGES_TYPES.arrow} />
          </LinkWrapper>
        </div>
      )}
      <div className={styles.footerLinks}>
        <div className={styles.emailContainer}>
          <Typography
            variant="p"
            className={styles.question}
          >
            Not sure where to start?
          </Typography>
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
