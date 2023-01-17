import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Images from 'UI/components/Images';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import { useImageSection } from './utils/useImageSection';
import { PAGE_WITH_TRANSPERENT_IMAGE_BUNDLES } from './utils/helpers';
import styles from './styles.module.scss';

const ImagesSection = (props) => {
  const {
    data,
    type,
    title,
    description,
    imagesUrl,
  } = useImageSection(props);

  return (
    <section
      className={cn(styles[type], styles[data.view], styles.container)}
    >
      {imagesUrl?.map((imgUrl) => (
        <Illustration
          transparent={PAGE_WITH_TRANSPERENT_IMAGE_BUNDLES.includes(type)}
          className={styles.bundleImage}
          src={imgUrl}
          alt=""
          key={`intro-images-bundles/${imgUrl}`}
        />
      ))}
      <SectionTitle
        title={title}
        description={description}
        type={type}
      />
      <Images
        data={data}
        type={type}
        view={data.view}
      />
      {data.subtitle
        && (
          <Typography
            variant="p"
            className={styles.secondDescription}
          >
            {data.subtitle}
          </Typography>
        )}
    </section>
  );
};

ImagesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesSection;
