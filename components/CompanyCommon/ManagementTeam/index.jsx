import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getImage } from 'utils/helper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

export const ManagementTeam = ({ managementTeam }) => managementTeam && (
  <section className={styles.managementTeam}>
    <div className={styles.contentWrapper}>
      <SectionTitle title="Our management team" />
      <div className={styles.managers}>
        {managementTeam?.map((manager, index) => {
          const { image, title, subtitle } = getDocumentFields(
            manager,
            ['image', 'title', 'subtitle'],
          );
          const photoUrl = getImage(image);

          return (
            <Animated
              key={`special/${title}`}
              type={ANIMATED_TYPE.isCustom}
              translateY="2.82352941em"
              opasityDuration={1}
              transformDuration={1}
              transitionDelay={50 + 50 * index}
            >
              <div className={styles.card}>
                <Illustration
                  src={photoUrl.url}
                  alt={photoUrl.alt}
                  className={styles.image}
                />
                <div className={styles.title}>
                  {title}
                </div>
                <div className={styles.subtitle}>
                  {subtitle}
                </div>
              </div>
            </Animated>
          );
        })}
      </div>
    </div>
  </section>
);

ManagementTeam.defaultProps = {
  managementTeam: [],
};

ManagementTeam.propTypes = {
  managementTeam: PropTypes.instanceOf(Array),
};

export default ManagementTeam;
