import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import CardContainer from 'UI/containers/CardContainer';
import useCard from './utils/useCard';
import styles from './Card.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'), { ssr: false });

const Card = (props) => {
  const {
    Wrapper,
    icon,
    title,
    text,
    children,
    className,
    image,
    withoutBackground,
    ...rest
  } = useCard(props);

  return (
    <Wrapper {...rest}>
      <CardContainer
        className={className}
        noBackground={withoutBackground}
      >
        {!!image?.url && (
          <Illustration
            className={styles.image}
            src={image.url}
            alt={image.alt}
            transparent
          />
        )}

        {icon && (
          <Svg
            type={icon}
            className={styles.icon}
          />
        )}

        <div className={styles.content}>
          <Typography
            variant={TYPOGRAPHY_TAGS.h3}
            size={TYPOGRAPHY_SIZE.headline20}
            isBold
            className={styles.title}
          >
            {title}
          </Typography>

          <div className={styles.cardContent}>
            <ContentfulParser document={text} />
          </div>

          <span
            data-read-more
            className={styles.readMore}
          >
            Read more
          </span>
        </div>
        {children}
      </CardContainer>
    </Wrapper>
  );
};

Card.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.instanceOf(Object),
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.instanceOf(Object),
  withoutBackground: PropTypes.bool,
};

export default Card;
