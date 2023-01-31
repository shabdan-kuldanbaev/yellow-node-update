import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'components/Common/ModalWindow';
import SectionTitle from 'UI/components/SectionTitle';
import FeedbackForm from 'UI/components/FeedbackForm';
import styles from './styles.module.scss';

const FullScreenEstimation = ({
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
          className={styles.feedbackForm}
          isBudgetSlider
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

export default FullScreenEstimation;
