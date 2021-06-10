import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AdditionInformation from 'components/ProjectIdea/AdditionInformation';
import styles from './styles.module.scss';

const Index = ({
  description,
  imageUrl,
  additionInformation,
}) => (
  <Fragment>
    <div className={styles.imageContainer}>
      <img
        src={imageUrl}
        className={styles.image}
        alt=""
      />
    </div>
    <div className={styles.descriptionContainer}>
      <p className={styles.sectionName}>
        About
      </p>
      <h2 className={styles.title}>
        Project Idea
      </h2>
      <p className={styles.description}>
        {description}
      </p>
      {additionInformation && (
        <div className={styles.additionalInfoContainer}>
          {additionInformation.map((information) => (
            <AdditionInformation
              key={information.title}
              title={information.title}
              information={information.list}
            />
          ))}
        </div>
      )}
    </div>
  </Fragment>
);

Index.propTypes = {
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  additionInformation: PropTypes.instanceOf(Array).isRequired,
};

export default Index;
