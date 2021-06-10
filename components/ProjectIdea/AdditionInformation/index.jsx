import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AdditionInformation = ({
  title,
  information,
}) => (
  <div className={styles.container}>
    <p className={styles.title}>
      {title}
    </p>
    <ul className={styles.listContainer}>
      {information.map((info) => (
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

AdditionInformation.propTypes = {
  title: PropTypes.string.isRequired,
  information: PropTypes.instanceOf(Array).isRequired,
};

export default AdditionInformation;
