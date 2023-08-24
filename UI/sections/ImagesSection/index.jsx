import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Images from 'UI/components/Images';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { useImageSection } from './utils/useImageSection';
import styles from './styles.module.scss';

const ImagesSection = (props) => {
  const {
    data,
    type,
    imagesUrl,
    text,
    sectionProps,
    sectionTitles,
  } = useImageSection(props);

  return (
    <section {...sectionProps}>
      {imagesUrl?.map(({ url, alt }) => (
        <Illustration
          transparent
          className={styles.bundleImage}
          src={url}
          alt={alt}
          key={`intro-images-bundles/${url}`}
        />
      ))}
      <SectionTitle {...sectionTitles} />
      <Images
        data={data}
        type={type}
        view={data.view}
      />
      {text
      && (
        <div className={styles.textContainer}>
          <ContentfulParser document={text} />
        </div>
      )}
    </section>
  );
};

ImagesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesSection;
