import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import FigmaPrototype from 'components/Common/FigmaPrototype';
import { usePrototypeSection } from './utils/usePrototypeSection';
import styles from './styles.module.scss';

const CasePrototype = (props) => {
  const {
    title,
    description,
    url,
    type,
  } = usePrototypeSection(props);

  return (
    <section className={cn([styles[type]])}>
      <SectionTitle
        title={title}
        description={description}
        type={type}
        titleStyle={styles.titleStyle}
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

CasePrototype.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CasePrototype;
