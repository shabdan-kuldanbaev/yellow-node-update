import cn from 'classnames';
import dynamic from 'next/dynamic';
import LinkWrapper from 'UI/components/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import Typography from 'UI/components/Typography';
import useCaseEvent from './utils/useCaseEvent';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CaseEvent = (props) => {
  const {
    type,
    title,
    description,
    listTitle,
    linksList,
    imageUrl,
  } = useCaseEvent(props);

  return (
    <section className={cn(styles.container, styles[type])}>
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        delay={100}
      >
        <SectionTitle
          title={title}
          description={description}
          className={styles.titleStyle}
        />
      </Animated>
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        delay={150}
      >
        <div className={styles.imageContainer}>
          <Illustration
            src={imageUrl}
            alt={type}
            className={styles.image}
          />
        </div>
      </Animated>
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        delay={200}
      >
        <div className={styles.contentContainer}>
          <Typography
            variant="h3"
            className={styles.contentTitle}
          >
            {listTitle}
          </Typography>
          <div className={styles.links}>
            {linksList.map(({ linkTitle, url }) => (
              <LinkWrapper
                key={url}
                path={url}
                className={styles.link}
              >
                {linkTitle}
              </LinkWrapper>
            ))}
          </div>
        </div>
      </Animated>
    </section>
  );
};

export default CaseEvent;
