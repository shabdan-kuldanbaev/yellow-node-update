import cn from 'classnames';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Wireframes from 'UI/components/Wireframes';
import { useWireframesSection } from './utils/useWireframesSection';
import styles from './styles.module.scss';

const WireframesSection = (props) => {
  const {
    type,
    view,
    title,
    images,
    description,
    subtitle,
    sectionProps,
  } = useWireframesSection(props);

  return (
    <section {...sectionProps}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        type={type}
        titleStyle={styles.titleStyle}
      />
      <Wireframes
        images={images}
        type={type}
        view={view}
      />
    </section>
  );
};

WireframesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default WireframesSection;
