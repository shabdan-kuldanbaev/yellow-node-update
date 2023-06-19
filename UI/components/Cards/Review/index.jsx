import cn from 'classnames';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import CardContainer from 'UI/containers/CardContainer';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import useReview from './utils/useReview';
import styles from './styles.module.scss';

const Review = (props) => {
  const {
    className,
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
    <CardContainer className={cn(
      styles.review,
      className,
      styles[companyTitle],
    )}
    >
      <div className={styles.content}>
        <Illustration
          src={companyLogo}
          alt={`${companyTitle} logo`}
          className={cn(styles.logo)}
          unoptimized
        />

        <ContentfulParser document={text} />
      </div>

      <div className={styles.author}>
        <Illustration
          src={avatar}
          alt={name}
          className={styles.photo}
        />

        <div className={styles.authorInfo}>
          <Typography
            className={styles.name}
            variant={TYPOGRAPHY_TAGS.p}
            isBold
          >
            {name}
          </Typography>
          <Typography
            className={styles.position}
            variant={TYPOGRAPHY_TAGS.p}
          >
            {position}
          </Typography>
        </div>
      </div>
    </CardContainer>
  );
};

export default Review;
