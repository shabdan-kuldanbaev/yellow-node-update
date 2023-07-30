import dynamic from 'next/dynamic';
import { ArcherElement } from 'react-archer';
import cn from 'classnames';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import CardContainer from 'UI/containers/CardContainer';
import styles from 'UI/sections/ProcessSection/styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const ProcessCard = (props) => {
  const {
    svgType,
    relations,
    typeTitle,
    text,
    index,
    className,
  } = props;

  return (
    <ArcherElement
      id={`element${index + 1}`}
      relations={relations}
    >
      <CardContainer className={cn(styles.cardContainer, className)}>
        <div className={styles.imageWrapper}>
          <Svg type={svgType} />
        </div>
        <div className={styles.cardContent}>
          <div
            className={styles.typeTitle}
            data-title
          >
            {typeTitle}
          </div>
          <ContentfulParser document={text} />
        </div>
      </CardContainer>
    </ArcherElement>
  );
};

export default ProcessCard;
