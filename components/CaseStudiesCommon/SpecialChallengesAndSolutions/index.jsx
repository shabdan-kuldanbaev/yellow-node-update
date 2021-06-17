import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const SpecialChallengesAndSolutions = ({ data, type }) => {
  const backgroundImageUrl = getFileUrl(get(data, 'images[0]', {}));
  const backgroundImage = { backgroundImage: `url(${backgroundImageUrl}), linear-gradient(180deg, #D45D94 0%, #FA717D 100%)` };

  return (
    <section
      className={styles[type]}
      style={backgroundImage}
    >
      <ChallengesAndSolutions
        data={data}
        isSpecial
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

export default SpecialChallengesAndSolutions;
