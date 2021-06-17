import React from 'react';
import PropTypes from 'prop-types';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const AdditionInformation = ({ additionInformation }) => {
  if (!additionInformation) {
    return null;
  }

  return (
    <div className={styles.infoContainer}>
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
                  {info}
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
};

AdditionInformation.propTypes = {
  additionInformation: PropTypes.instanceOf(Object),
};

export default AdditionInformation;
