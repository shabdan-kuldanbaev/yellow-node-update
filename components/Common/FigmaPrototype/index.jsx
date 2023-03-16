import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Illustration from 'UI/components/Illustration';
import { CUSTOM_DOMAIN } from 'utils/constants';
import styles from './styles.module.scss';

const FigmaPrototype = ({
  src,
  deviceFrameSrc,
  className,
}) => {
  const url = useMemo(() => {
    const prototypeUrl = new URL('https://www.figma.com/embed');

    prototypeUrl.searchParams.set('embed_host', CUSTOM_DOMAIN);
    prototypeUrl.searchParams.set('url', src);

    return prototypeUrl;
  }, [src]);

  return (
    <div className={cn(styles.prototypeContainer, className)}>
      <iframe
        src={url}
        className={styles.prototype}
        frameBorder="0"
        title="Figma prototype "
        seamless
      />
      <Illustration
        src={deviceFrameSrc}
        className={styles.deviceFrame}
      />
    </div>
  );
};

FigmaPrototype.defaultProps = {
  className: null,
  deviceFrameSrc: '/images/common/devices/iPhone.png',
};

FigmaPrototype.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  deviceFrameSrc: PropTypes.string,
};

export default FigmaPrototype;
