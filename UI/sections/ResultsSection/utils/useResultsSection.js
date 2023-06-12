import get from 'lodash/get';
import cn from 'classnames';
import Video from 'components/Common/Video';
import Illustration from 'UI/components/Illustration';
import {
  getDocumentFields,
  getFileUrl, getOptimizedContentfulImage,
} from 'utils/helper';
import styles from '../styles.module.scss';

export const useResultsSection = ({ data, type }) => {
  const {
    title,
    description,
    images,
    contentModules,
    view,
    background,
  } = data;

  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(background),
    { fm: 'webp' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};
  const moduleData = getDocumentFields(get(contentModules, '[0]', {}));
  const screenUrl = getFileUrl(moduleData?.images?.[0]);
  const imagesBundles = moduleData?.imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];
  const assets = (images || []).map((assetData, index) => {
    const {
      description: alt,
      file: { contentType },
    } = getDocumentFields(assetData, ['file', 'description']);

    const url = getFileUrl(assetData);

    if (contentType === 'video/mp4') {
      return (
        <Video
          src={url}
          className={cn(styles.video, styles[`video-${index + 1}`])}
        />
      );
    }

    return (
      <Illustration
        unoptimized
        transparent
        className={cn(styles.prototype, styles[`prototype-${index + 1}`])}
        src={url}
        alt={alt}
      />
    );
  });

  return {
    view,
    type,
    title,
    description,
    screenUrl,
    imagesBundles,
    sectionStyle,
    assets,
  };
};
