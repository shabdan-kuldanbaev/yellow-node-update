import React from 'react';
import SectionTitle from 'components/Common/SectionTitle';
import Animated from 'components/Common/Animated';
import PlacementInfoItem from './PlacementInfoItem';
import Map from './Map';
import {
  animatedProps,
  placementInfo,
} from './utils';
import styles from './styles.module.scss';

const CompanyPlacement = () => (
  <section className={styles.companyPlacement}>
    <Animated {...animatedProps}>
      <SectionTitle
        title="Our offices"
        styleTitle={styles.title}
      />
      <ul className={styles.placementList}>
        {Object.entries(placementInfo).map(([country, info]) => (
          <PlacementInfoItem
            key={country}
            country={country}
            placementInfo={info}
          />
        ))}
      </ul>
    </Animated>
    <Animated {...animatedProps}>
      <Map />
    </Animated>
  </section>
);

export default CompanyPlacement;
