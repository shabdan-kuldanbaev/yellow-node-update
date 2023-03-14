import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import ModalWindow from 'components/Common/ModalWindow';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import LinkWrapper from 'UI/components/LinkWrapper';
import { CONTACTS_DATA } from 'utils/constants';
import styles from './styles.module.scss';

const FeedbackForm = dynamic(() => import('UI/components/Forms/FeedbackForm'), { ssr: false });

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
      <Typography
        variant={TYPOGRAPHY_TAGS.p}
        size={TYPOGRAPHY_SIZE.headline38}
        className={styles.title}
        isBold
      >
        Got a project in mind?
      </Typography>
      <Typography
        variant={TYPOGRAPHY_TAGS.p}
        size={TYPOGRAPHY_SIZE.paragrapgh16}
        className={styles.subtitle}
      >
        Fill in this form or
        {' '}
        <LinkWrapper path={`mailto:${CONTACTS_DATA.email}`}>send us an e-mail</LinkWrapper>
      </Typography>
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

export const FullscreenEstimationContext = createContext({ isShown: false, open: () => null });

export default FullScreenEstimation;
