import React from 'react';
import PropTypes from 'prop-types';
import { themes } from 'utils/helper';
import { socialNetworks } from './utils/data';
import styles from './styles.module.scss';

const SocialIcons = ({ theme }) => (
  <div className={styles.socialContainer}>
    {socialNetworks.map((network) => (
      <a
        key={`social/${network.title}`}
        href={network.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {network.image(themes[theme].main, themes[theme].secondary)}
      </a>
    ))}
  </div>
);

SocialIcons.defaultProps = {
  theme: 'dark',
};

SocialIcons.propTypes = {
  theme: PropTypes.string,
};


export default SocialIcons;
