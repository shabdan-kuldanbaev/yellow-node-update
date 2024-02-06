import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';
import Logo from 'UI/components/Logo';
import Typography from 'UI/components/Typography';
import { usePathname } from 'next/navigation';
import { socialMedia } from '../utils/data';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const SideContent = ({ socialMedia: socialMediaList }) => {
  const pathname = usePathname();

  return (
    <div className={styles.sideContent}>
      <div className={styles.logoWrapper}>
        <Logo type="footer" />
      </div>
      <Typography className={styles.text}>
        Software innovation powerhouse born to take
        your business to the top!
      </Typography>
      <div className={styles.socialMediaList}>
        {socialMediaList.map(({
          iconLight: type,
          title,
          link,
        }) => link && (
          <LinkWrapper
            key={`networks/${type}`}
            path={link}
            googleAnalyticProps={{
              action: 'Click',
              category: 'Social',
              label: pathname,
              data: title,
            }}
            isSocialLink
          >
            <Svg
              type={type}
              className={styles.svg}
            />
          </LinkWrapper>
        ))}
      </div>
    </div>
  );
};

SideContent.defaultProps = {
  socialMedia,
};

SideContent.propTypes = {
  socialMedia: PropTypes.instanceOf(Array),
};

export default SideContent;
