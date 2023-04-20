import dynamic from 'next/dynamic';
import SectionTitle from 'components/Common/SectionTitle';
import { PLACEMENT_DATA } from 'utils/constants/contacts';
import PlacementInfoItem from './PlacementInfoItem';
import { animatedProps } from './utils';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

const CompanyPlacement = () => (
  <section className={styles.companyPlacement}>
    <Animated {...animatedProps}>
      <SectionTitle
        title="Our offices"
        styleTitle={styles.title}
      />
      <ul className={styles.placementList}>
        {Object.entries(PLACEMENT_DATA).map(([country, info]) => (
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
