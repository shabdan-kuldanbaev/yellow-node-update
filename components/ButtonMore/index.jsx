import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from './styles.module.scss';

const ButtonMore = ({ href, title }) => (
  <Link href={href}>
    <span className={styles.button}>{title}</span>
  </Link>
);

ButtonMore.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ButtonMore;
