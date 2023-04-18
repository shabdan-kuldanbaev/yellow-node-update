import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import LinkWrapper from 'components/Common/LinkWrapper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { useFetchPageQuery } from 'redux/apis/page';
import { EMAIL_LINK } from 'utils/constants/contacts';
import { getFooterProps } from './utils/propsHelper';
import { socialNetworks } from './utils/data';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const CaseStudiesFooter = ({
  type,
  pathname,
}) => {
  const { data = {} } = useFetchPageQuery(type);
  const { contentModules: currentProject = [] } = data;
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
            path={`mailto:${EMAIL_LINK}`}
            className={styles.link}
            isLocalLink
            googleAnalyticProps={{
              action: 'Click',
              data: 'Email',
            }}
          >
            {EMAIL_LINK}
          </LinkWrapper>
        </div>
        <div>
          {socialNetworks.map(({
            name,
            href,
            iconDark: iconType,
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
};

export default CaseStudiesFooter;
