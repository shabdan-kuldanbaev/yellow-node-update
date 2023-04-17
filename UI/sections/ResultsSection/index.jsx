import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Video from 'components/Common/Video';
import Illustration from 'UI/components/Illustration';
import { useResultsSection } from './utils/useResultsSection';
import styles from './styles.module.scss';

const ResultsSection = (props) => {
  const {
    view,
    type,
    title,
    description,
    prototypeUrl,
    screenUrl,
    imagesBundles,
    sectionStyle,
    isResultVideo,
  } = useResultsSection(props);

  return (
    <section
      className={cn(styles.container, [styles[type]], [styles[view]])}
      style={sectionStyle}
    >
      <SectionTitle
        title={title}
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
        {isResultVideo
          ? (
            <Video
              src={prototypeUrl}
              className={styles.video}
            />
          )
          : (
            <Illustration
              unoptimized
              transparent
              className={styles.prototype}
              src={prototypeUrl}
              alt={prototypeUrl}
            />
          )}
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
