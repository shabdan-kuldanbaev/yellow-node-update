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
    sectionStyle,
  } = useWireframesSection(props);

  return (
    <section
      className={cn(styles[type], styles[view], styles.container)}
      style={sectionStyle}
    >
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
      />
    </section>
  );
};

WireframesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default WireframesSection;
