import CardContainer from 'UI/containers/CardContainer';
import Illustration from 'UI/components/Illustration';
import LinkWrapper from 'UI/components/LinkWrapper';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import useEmbedArticleCard from './utils/useEmbedArticleCard';
import styles from './EmbedArticleCard.module.scss';

const EmbedArticleCard = (props) => {
  const {
    title,
    description,
    url,
    image,
  } = useEmbedArticleCard(props);

  return (
    <CardContainer className={styles.container}>
      <div className={styles.content}>
        <Typography
          isBold
          variant="h3"
          size={TYPOGRAPHY_SIZE.headline24}
          mobileSize={TYPOGRAPHY_SIZE.headline20}
          className={styles.title}
        >
          {title}
        </Typography>

        <Typography
          variant="p"
          size={TYPOGRAPHY_SIZE.paragrapgh16}
          className={styles.description}
        >
          {description}
        </Typography>

        <LinkWrapper
          path={url}
          className={styles.link}
        >
          Learn more
        </LinkWrapper>
      </div>

      <Illustration
        src={image.url}
        alt={image.alt}
        className={styles.image}
      />
    </CardContainer>
  );
};

export default EmbedArticleCard;
