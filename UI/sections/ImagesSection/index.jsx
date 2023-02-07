import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Images from 'UI/components/Images';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import { useImageSection } from './utils/useImageSection';
import styles from './styles.module.scss';

const ImagesSection = (props) => {
  const {
    data,
    type,
    title,
    descriptions,
    imagesUrl,
  } = useImageSection(props);

  return (
    <section
      className={cn(styles[type], styles[data.view], styles.section)}
    >
      {imagesUrl?.map(({ url, alt }) => (
        <Illustration
          transparent
          className={styles.bundleImage}
          src={url}
          alt={alt}
          key={`intro-images-bundles/${url}`}
        />
      ))}
      <SectionTitle
        title={title}
        description={descriptions.shift()}
        type={type}
        titleStyle={styles.titleStyle}
      >
        {descriptions?.map((text, index) => (
          <Typography
            key={index}
            variant="p"
            className={styles.text}
          >
            {text}
          </Typography>
        ))}
      </SectionTitle>
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
