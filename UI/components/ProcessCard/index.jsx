import React from 'react';
import { ArcherElement } from 'react-archer';
import Svg from 'components/Common/Svg';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import styles from 'UI/sections/ProcessSection/styles.module.scss';

const ProcessCard = (props) => {
  const {
    svgType,
    relations,
    typeTitle,
    text,
    index,
  } = props;

  return (
    <ArcherElement
      id={`element${index + 1}`}
      relations={relations}
    >
      <div className={styles.cardContainer}>
        <div className={styles.imageWrapper}>
          <Svg type={svgType} />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.typeTitle}>
            {typeTitle}
          </div>
          <ContentfulParser document={text} />
        </div>
      </div>
    </ArcherElement>
  );
};

export default ProcessCard;
