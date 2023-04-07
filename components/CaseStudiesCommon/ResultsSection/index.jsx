import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Video from 'components/Common/Video';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { isResultHasVideo, getResultProps } from './utils/resultsHelper';
import styles from './styles.module.scss';

const ResultsSection = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};

  const {
    smartphoneUrl,
    appScreenUrl,
    imagesBundlesData,
  } = getResultProps(data);

  const { view } = data;

  return (
    <section
      className={cn([styles[type]], [styles[view]])}
      style={sectionStyle}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.circle}>
        <Illustration
          layout="responsive"
          className={styles.mockup}
          src={smartphoneUrl}
          alt={smartphoneUrl}
        />
        {isResultHasVideo(type)
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
        {imagesBundlesData && imagesBundlesData.imagesBundles.map((bundle, index) => {
          const bundleUrl = getFileUrl(bundle);

          return (
            <Illustration
              layout="responsive"
              className={cn(styles.imageBundle, styles[`imageBundle-${index + 1}`])}
              src={bundleUrl}
              alt={type}
              key={`result-images-bundles/${bundleUrl}`}
            />
          );
        })}
      </div>
    </section>
  );
};

ResultsSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ResultsSection;
