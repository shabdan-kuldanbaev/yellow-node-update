import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Images from 'UI/components/Images';
import { useImageSection } from './utils/useImageSection';
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
        <img
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
          <p className={styles.secondDescription}>
            {data.subtitle}
          </p>
        )}
    </section>
  );
};

ImagesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesSection;
