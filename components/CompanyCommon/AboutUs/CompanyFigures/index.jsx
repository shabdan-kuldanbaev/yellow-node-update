import React from 'react';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { companyFiguresData } from './utils/data';
import styles from './styles.module.scss';

export const CompanyFigures = ({ companyFiguresData }) => (
  <div className={styles.companyFigures}>
    {companyFiguresData && companyFiguresData.map((item, index) => (
      <Animated
        key={item.title}
        type={animatedType.isCustom}
        translateX={150}
        translateY={0}
        opasityDuration={0.8}
        transformDuration={0.8}
        transitionDelay={1300 + 80 * index * 5}
      >
        <div key={item.title} className={styles.item}>
          <div>{`${item.number}${item.isPlus ? '+' : ''}`}</div>
          <div>{item.title}</div>
        </div>
      </Animated>
    ))}
  </div>
);

CompanyFigures.defaultProps = {
  companyFiguresData,
};
