import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import LinkWrapper from 'UI/components/LinkWrapper';
import FeedbackForm from 'UI/components/Forms/FeedbackForm';
import { EMAIL_LINK } from 'utils/constants';
import useFeedbackProps from './utils/useFeedbackProps';
import styles from './styles.module.scss';

const CaseFeedback = (props) => {
  const {
    type,
    title,
    secondTitle,
    isSliderBudget,
  } = useFeedbackProps(props);

  return (
    <section className={cn(styles.section, styles[type])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          secondTitle={secondTitle}
          titleStyle={styles.titleStyle}
        >
          <p className={styles.linkText}>
            Fill in this form or
            <LinkWrapper
              className={styles.link}
              path={`mailto:${EMAIL_LINK}`}
              isLocalLink
              googleAnalyticProps={{
                action: 'Click',
                data: 'Email',
              }}
            >
              send us an e-mail
            </LinkWrapper>
          </p>
        </SectionTitle>
        <FeedbackForm
          isBudgetSlider={isSliderBudget}
          type={type}
        />
      </div>
    </section>
  );
};

export default CaseFeedback;
