import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import { themes } from 'utils/helper';
import { socialNetworks } from './utils/data';
import styles from './styles.module.scss';

export const SocialIcons = ({ theme }) => (
  <div className={styles.socialContainer}>
    {socialNetworks.map((network) => (
      <LinkWrapper
        key={`social/${network.title}`}
        path={network.href}
        isLocalLink
      >
        {network.image(themes[theme].main, themes[theme].secondary)}
      </LinkWrapper>
    ))}
  </div>
);

SocialIcons.defaultProps = {
  theme: 'dark',
};

SocialIcons.propTypes = {
  theme: PropTypes.string,
};
