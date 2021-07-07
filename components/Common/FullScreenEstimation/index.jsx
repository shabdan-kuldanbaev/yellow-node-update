import React from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitle,
  FeedbackForm,
  ModalWindow,
} from 'components';
import styles from './styles.module.scss';

export const FullScreenEstimation = ({
  isFullscreenEstimation,
  closeFullscreenEstimation,
}) => (
  <ModalWindow
    isModalWindow={isFullscreenEstimation}
    closeModalWindow={closeFullscreenEstimation}
    className={styles.fullscreenEstimation}
  >
    <div className={styles.estimationContainer}>
      <SectionTitle
        title="Got a project in mind?"
        styleTitle={styles.title}
        styleSubtitle={styles.subtitle}
        isFeedbackForm
        subtitle="Fill in this form or"
        linkText="send us an e-mail"
      />
      {isFullscreenEstimation && (
        <FeedbackForm
          isChooseBudget
          formKey="estimation"
        />
      )}
    </div>
  </ModalWindow>
);

FullScreenEstimation.propTypes = {
  isFullscreenEstimation: PropTypes.bool.isRequired,
  closeFullscreenEstimation: PropTypes.func.isRequired,
};
