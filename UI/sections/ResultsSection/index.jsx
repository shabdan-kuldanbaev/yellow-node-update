import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Video from 'components/Common/Video';
import Illustration from 'UI/components/Illustration';
import Media from 'UI/components/Media';
import FigmaPrototype from 'components/Common/FigmaPrototype';
import { useResultsSection } from './utils/useResultsSection';
import styles from './styles.module.scss';

const ResultsSection = (props) => {
  const {
    view,
    type,
    title,
    subtitle,
    description,
    screenUrl,
    imagesBundles,
    sectionStyle,
    images,
    prototypeLink,
  } = useResultsSection(props);

  return (
    <section
      className={cn(styles.container, styles[type], styles[view])}
      style={sectionStyle}
    >
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        type={type}
        className={styles.sectionTitle}
      />
      <div className={styles.contentWrapper}>
        <Illustration
          transparent
          className={styles.screen}
          src={screenUrl}
          alt={screenUrl}
        />
        {prototypeLink && (
          <FigmaPrototype
            src={prototypeLink}
            className={styles.figmaPrototype}
          />
        )}
        {images?.map((image, index) => (
          <Media
            key={`${index + 1}`}
            asset={image}
            className={cn(styles.media, styles[`media-${index + 1}`])}
          />
        ))}
        {imagesBundles?.map((bundleUrl, index) => (
          <Illustration
            className={cn(styles.imageBundle, styles[`imageBundle-${index + 1}`])}
            src={bundleUrl}
            alt={type}
            key={`result-images-bundles/${bundleUrl}`}
          />
        ))}
      </div>
    </section>
  );
};

ResultsSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ResultsSection;
