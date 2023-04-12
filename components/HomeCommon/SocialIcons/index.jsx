import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import { themes } from 'utils/helper';
import { socialNetworks } from './utils/data';
import styles from './styles.module.scss';

const SocialIcons = ({ theme, socialNetworks: socialLinks }) => (
  <div className={styles.socialContainer}>
    {socialLinks?.map(({ href, image }) => {
      const svgIcon = image(themes[theme].main);

      return (
        <LinkWrapper
          key={`social/${href}`}
          path={href}
          isLocalLink
          isSocialLink
        >
          {svgIcon}
        </LinkWrapper>
      );
    })}
  </div>
);

SocialIcons.defaultProps = {
  theme: 'dark',
  socialNetworks,
};

SocialIcons.propTypes = {
  theme: PropTypes.string,
  socialNetworks: PropTypes.instanceOf(Array),
};

export default SocialIcons;
