import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import LinkWrapper from 'UI/components/LinkWrapper';
import { EMAIL_LINK } from 'utils/constants/contacts';
import useFeedbackProps from './utils/useFeedbackProps';
import styles from './styles.module.scss';

const FeedbackForm = dynamic(() => import('UI/components/Forms/FeedbackForm'), { ssr: false });

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
        <FeedbackForm
          className={styles.form}
          isBudgetSlider={isSliderBudget}
          type={type}
          formHeader={(
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
          )}
        />
      </div>

    </section>
  );
};

export default CaseFeedback;
