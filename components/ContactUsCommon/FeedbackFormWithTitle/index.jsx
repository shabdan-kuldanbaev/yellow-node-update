import SectionTitle from 'components/Common/SectionTitle';
import FeedbackForm from 'components/Common/FeedbackForm';
import styles from './styles.module.scss';

const FeedbackFormWithTitle = () => (
  <section className={styles.feedbackFormWithTitle}>
    <div>
      <SectionTitle
        isMainTitle
        title="Got a project in mind?"
        styleTitle={styles.title}
        styleSubtitle={styles.subtitle}
        isFeedbackForm
        subtitle="Fill in this form or"
        linkText="send us an e-mail"
      />
      <FeedbackForm isChooseBudget />
    </div>
  </section>
);

export default FeedbackFormWithTitle;
