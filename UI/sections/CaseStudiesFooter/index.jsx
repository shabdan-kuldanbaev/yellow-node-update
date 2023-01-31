import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectProject } from 'redux/selectors/portfolio';
import Svg from 'UI/components/Svg';
import LinkWrapper from 'UI/components/LinkWrapper';
import Typography from 'UI/components/Typography';
import SectionTitle from 'UI/components/SectionTitle';
import { SVG_IMAGES_TYPES, EMAIL_LINK } from 'utils/constants';
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
      className={cn(styles[type], styles.footer)}
      style={footerStyle}
    >
      {slug && (
        <div className={styles.nextProjectContainer}>
          <SectionTitle
            title="Next project"
            description={title}
            className={styles.sectionTitle}
          />
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
            path={`mailto:${EMAIL_LINK}`}
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
          {socialNetworks?.map(({
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
