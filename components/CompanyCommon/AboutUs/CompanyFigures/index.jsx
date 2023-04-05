import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { ANIMATED_TYPE } from 'utils/constants';
import { companyFiguresData } from './utils/data';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

export const CompanyFigures = ({ companyFiguresData: companyFigures }) => (
  <div className={styles.companyFigures}>
    {companyFigures && companyFigures.map((item, index) => (
      <Animated
        key={item.title}
        type={ANIMATED_TYPE.isCustom}
        translateX="2.82352941em"
        translateY="0"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={90 * index * 2}
      >
        <div
          key={item.title}
          className={styles.item}
        >
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

CompanyFigures.propTypes = {
  companyFiguresData: PropTypes.instanceOf(Array),
};
