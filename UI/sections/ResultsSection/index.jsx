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
    smartphoneUrl,
    appScreenUrl,
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
      <div className={styles.circle}>
        <Illustration
          layout="responsive"
          className={styles.mockup}
          src={smartphoneUrl}
          alt={smartphoneUrl}
        />
        {isResultVideo
          ? (
            <Video
              src={appScreenUrl}
              className={styles.video}
            />
          )
          : (
            <Illustration
              layout="responsive"
              className={styles.appImage}
              src={appScreenUrl}
              alt={appScreenUrl}
            />
          )}
        {imagesBundles?.map((bundleUrl, index) => (
          <Illustration
            transparent
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
