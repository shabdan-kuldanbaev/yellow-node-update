import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AdditionInformation = ({ additionInformation }) => (
  <div className={styles.infoContainer}>
    {additionInformation.map(({ title, list }) => (
      <div className={styles.container}>
        <p className={styles.title}>
          {title}
        </p>
        <ul className={styles.listContainer}>
          {list.map((info) => (
            <li
              key={info}
              className={styles.listItemContainer}
            >
              {info}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

AdditionInformation.propTypes = {
  additionInformation: PropTypes.instanceOf(Array).isRequired,
};

export default AdditionInformation;
