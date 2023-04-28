import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import CompanyLocation from 'UI/components/CompanyLocation';
import Map from 'UI/components/CompanyLocationMap';
import { addressesForContactUs } from 'UI/components/CompanyLocation/utils/data';
import styles from './CompanyPlacementWithMap.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CompanyPlacementWithMap = () => (
  <section className={styles.companyPlacement}>
    <div className={styles.content}>
      <SectionTitle
        title="Our offices"
        className={styles.title}
      />

      <Animated {...REVEAL_ANIMATION_PROPS}>
        <CompanyLocation
          addresses={addressesForContactUs}
          itemClass={styles.address}
          containerClass={styles.addressesContainer}
        />
      </Animated>
    </div>

    <Animated {...REVEAL_ANIMATION_PROPS}>
      <Map />
    </Animated>
  </section>
);

export default CompanyPlacementWithMap;
