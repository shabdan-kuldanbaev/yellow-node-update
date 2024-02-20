import PropTypes from 'prop-types';
import cn from 'classnames';
import ChallengesAndSolutions from 'UI/components/ChallengesAndSolutions';
import SectionTitle from 'UI/components/SectionTitle';
import Wireframes from 'UI/components/Wireframes';
import Illustration from 'UI/components/Illustration';
import { useChallengesAndSolutionsWithWireframes } from './utils/useChallengesAndSolutionsWithWireframes';
import styles from './styles.module.scss';

const ChallengesAndSolutionsWithWireframes = (props) => {
  const {
    data,
    type,
    view,
    title,
    images,
    subtitle,
    description,
    background,
  } = useChallengesAndSolutionsWithWireframes(props);

  return (
    <section
      className={
        cn(
          styles[type],
          styles[view],
          styles.container,
          {
            [styles.challengesWithoutImage]: images?.length,
          },
        )
      }
    >
      {background && (
        <Illustration
          src={background.url}
          className={styles.background}
        />
      )}
      <SectionTitle
        type={type}
        title={title}
        subtitle={subtitle}
        description={description}
        className={styles.titleStyle}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
        view={view}
      />
      <Wireframes
        images={images}
        type={type}
        view={view}
      />
    </section>
  );
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default ChallengesAndSolutionsWithWireframes;
