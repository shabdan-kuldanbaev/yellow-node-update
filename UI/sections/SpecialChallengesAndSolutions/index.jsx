import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import ChallengesAndSolutions from 'UI/components/ChallengesAndSolutions';
import { useSpecialChallengesAndSolutions } from './utils/useSpecialChallengesAndSolutions';
import styles from './styles.module.scss';

const SpecialChallengesAndSolutions = (props) => {
  const {
    data,
    type,
    title,
    subtitle,
    description,
    sectionBackgroundImage,
  } = useSpecialChallengesAndSolutions(props);

  return (
    <section
      className={cn(styles[type], styles[data.view], styles.container)}
      style={sectionBackgroundImage}
    >
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        type={type}
        titleStyle={styles.titleStyle}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
        view={data.view}
        isSpecial
      />
    </section>
  );
};

SpecialChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default SpecialChallengesAndSolutions;
