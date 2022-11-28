import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import CardContainer from 'UI/containers/CardContainer';
import useReview from './utils/useReview';
import styles from './styles.module.scss';

const Review = (props) => {
  const {
    companyLogo,
    companyTitle,
    text,
    author: {
      name,
      avatar,
      position,
    },
  } = useReview(props);

  return (
    <CardContainer className={styles.review}>
      <div className={styles.messageWrapper}>
        <Illustration
          src={companyLogo}
          alt={`${companyTitle} logo`}
          className={styles.logo}
        />

        <ContentfulParser document={text} />
      </div>

      <div className={styles.author}>
        <Illustration
          src={avatar}
          alt={name}
          className={styles.photo}
        />

        <div className={styles.info}>
          <span className={styles.name}>
            {name}
          </span>
          <span className={styles.position}>
            {position}
          </span>
        </div>
      </div>
    </CardContainer>
  );
};

export default Review;
