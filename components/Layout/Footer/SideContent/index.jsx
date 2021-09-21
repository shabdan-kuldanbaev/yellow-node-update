import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import Logo from 'components/Common/Logo';
import { socialMedia } from './utils/data';
import styles from './styles.module.scss';

export const SideContent = ({ socialMedia: socialMediaList }) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.sideContent}>
      <Logo type="footer" />
      <p className={styles.text}>
        Software innovation powerhouse born to take
        your business to the top!
      </p>
      <div className={styles.socialMediaList}>
        {socialMediaList && socialMediaList.map(({
          type,
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
