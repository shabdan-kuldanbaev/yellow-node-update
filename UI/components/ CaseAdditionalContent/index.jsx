import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CaseAdditionalContent = ({
  type,
  data,
}) => (
  <div className={cn(styles[type], styles.additionalContent)}>
    {data?.map(({ title, contentList }, index) => (
      <div
        key={title}
        className={cn(styles.container, styles[`container-${index + 1}`])}
      >
        <p className={styles.title}>
          {title}
        </p>
        <ul className={styles.listContainer}>
          {contentList && contentList.map((info) => (
            <li
              key={info}
              className={styles.listItem}
            >
              <span>{info}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

CaseAdditionalContent.defaultProps = {
  data: null,
};

CaseAdditionalContent.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object),
};

export default CaseAdditionalContent;
