import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const AdditionInformation = ({
  additionInformation,
  type,
  className,
}) => {
  if (!additionInformation) {
    return null;
  }

  return (
    <div className={cn(styles[type], className)}>
      {additionInformation.map((data) => {
        const { title, contentList } = getDocumentFields(data);

        return (
          <div
            key={title}
            className={styles.container}
          >
            <p className={styles.title}>
              {title}
            </p>
            <ul className={styles.listContainer}>
              {contentList && contentList.map((info) => (
                <li
                  key={info}
                  className={styles.listItemContainer}
                >
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

AdditionInformation.defaultProps = {
  additionInformation: null,
  className: '',
};

AdditionInformation.propTypes = {
  additionInformation: PropTypes.instanceOf(Object),
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AdditionInformation;
