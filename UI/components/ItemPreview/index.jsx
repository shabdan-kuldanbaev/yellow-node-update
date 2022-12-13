import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Illustration from 'UI/components/Illustration';
import { useItemPreview } from './utils/useItemPreview';
import styles from './styles.module.scss';

const ItemPreview = (props) => {
  const {
    type,
    slug,
    link,
    imageUrl,
  } = useItemPreview(props);

  return (
    <LinkWrapper path={link}>
      <div
        className={cn(
          styles.container,
          styles[type],
          styles[slug],
        )}
      >
        <Illustration
          className={styles.image}
          src={imageUrl}
          alt={slug}
          lazyBoundary="2000px"
          priority
        />
      </div>
    </LinkWrapper>
  );
};

ItemPreview.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemPreview;
