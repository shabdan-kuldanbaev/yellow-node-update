import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Video from 'components/Common/Video';
import Illustration from 'UI/components/Illustration';
import { useResultsSection } from './utils/useResultsSection';
import styles from './styles.module.scss';

const ResultsSection = (props) => {
  const {
    ref,
    view,
    type,
    title,
    description,
    prototypesUrl,
    screenUrl,
    imagesBundles,
    sectionStyle,
    isResultVideo,
  } = useResultsSection(props);

  return (
    <section
      className={cn(styles.container, styles[type], styles[view])}
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
            prototypesUrl.map((url, index) => (
              <Video
                ref={ref}
                src={url}
                className={cn(styles.video, styles[`video-${index + 1}`])}
              />
            ))
          )
          : (
            prototypesUrl.map((url, index) => (
              <Illustration
                unoptimized
                transparent
                className={cn(styles.prototype, styles[`prototype-${index + 1}`])}
                src={url}
                alt={url}
              />
            ))

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
