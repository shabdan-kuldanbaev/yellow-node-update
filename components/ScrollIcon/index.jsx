import React from 'react';
import PropTypes from 'proptypes';
import { themes } from 'utils/helper';

import styles from './styles.module.scss';

const ScrollIcon = ({ theme }) => (
  <svg className={styles.swing} xmlns="http://www.w3.org/2000/svg" width="19" height="23" viewBox="0 0 19 23">
    <path fill={themes[theme].main} fillRule="evenodd" d="M10.65 21.786l7.996-7.995c.228-.229.354-.533.354-.857 0-.325-.126-.629-.354-.857l-.726-.726a1.226 1.226 0 0 0-1.724 0l-4.675 4.665V1.196C11.521.528 10.998 0 10.33 0H9.303C8.635 0 8.06.528 8.06 1.196v14.873l-4.7-4.718a1.186 1.186 0 0 0-.85-.354c-.324 0-.624.126-.852.354l-.724.726a1.201 1.201 0 0 0-.353.857c0 .324.126.629.355.857l7.995 7.996c.23.228.535.354.86.353.326.001.632-.125.86-.354z" />
  </svg>
);

ScrollIcon.defaultProps = {
  theme: 'dark',
};

ScrollIcon.propTypes = {
  theme: PropTypes.string,
};


export default ScrollIcon;
