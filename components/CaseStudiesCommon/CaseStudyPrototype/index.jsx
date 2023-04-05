import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import FigmaPrototype from 'components/Common/FigmaPrototype';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CaseStudyPrototype = ({ data, type }) => {
  const contentModules = get(data, 'contentModules');

  if (!contentModules) {
    return null;
  }

  const { url } = getDocumentFields(contentModules[0]);

  return (
    <section className={cn([styles[type]])}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.prototypeWrapper}>
        {url && (
          <FigmaPrototype
            src={url}
            className={styles.prototype}
          />
        )}
      </div>
    </section>
  );
};

CaseStudyPrototype.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseStudyPrototype;
