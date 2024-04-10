import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import LinkWrapper from 'UI/components/LinkWrapper';
import Typography from 'UI/components/Typography';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { EMAIL_LINK } from 'utils/constants/contacts';
import { useCaseStudiesFooter } from './utils/useCaseStudiesFooter';
import styles from './styles.module.scss';

const SectionTitle = dynamic(() => import('UI/components/SectionTitle'));
const Svg = dynamic(() => import('UI/components/Svg'));

const CaseStudiesFooter = async (props) => {
  const {
    type,
    title,
    buttonTitle,
    slug,
    pathname,
    footerStyle,
    socialNetworks,
  } = await useCaseStudiesFooter(props);

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
            <>
              <Typography className={styles.textIndent}>
                {buttonTitle}
              </Typography>
              <Svg type={SVG_IMAGES_TYPES.arrow} />
            </>
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
            {EMAIL_LINK}
          </LinkWrapper>
        </div>
        <div>
          {socialNetworks?.map(({
            name,
            href,
            icon,
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
              <Svg type={icon} />
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
