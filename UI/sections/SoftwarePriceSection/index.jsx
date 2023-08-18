import React from 'react';
import cn from 'classnames';
import SoftwarePriceForm from 'UI/components/Forms/SoftwarePriceForm';
import { useSoftwarePriceSection } from './utils/useSoftwarePriceSection';
import styles from './styles.module.scss';
import {
  SOFTWARE_PRICE_DATA,
} from './utils/helpers';

const SoftwarePriceSection = (props) => {
  const { type, slug } = useSoftwarePriceSection(props);

  return (
    <section className={cn(styles.softwarePriceSection, styles[type], styles[slug])}>
      <div className={styles.contentWrapper}>
        <SoftwarePriceForm
          title="Expand your own resources"
          list={['Thorough talent selection', 'Team formation in 1-3 weeks', '24/7 support']}
          data={SOFTWARE_PRICE_DATA.expand}
        />
        <SoftwarePriceForm
          title="Hire a dedicated team"
          list={['End-to-end development', 'Start in 2 weeks', 'Fully-staffed team']}
          data={SOFTWARE_PRICE_DATA.hire}
        />
      </div>
    </section>
  );
};

export default SoftwarePriceSection;
