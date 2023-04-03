import PropTypes from 'prop-types';
import cn from 'classnames';
import ChallengesAndSolutions from 'UI/components/ChallengesAndSolutions';
import SectionTitle from 'UI/components/SectionTitle';
import Wireframes from 'UI/components/Wireframes';
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
    sectionStyle,
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
      style={sectionStyle}
    >
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

ChallengesAndSolutions.defaultProps = {
  type: '',
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default ChallengesAndSolutionsWithWireframes;
