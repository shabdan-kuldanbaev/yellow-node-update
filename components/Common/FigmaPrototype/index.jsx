import { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Illustration from 'UI/components/Illustration';
import { CUSTOM_DOMAIN } from 'utils/constants';
import styles from './styles.module.scss';

const defaultDeviceFrame = '/images/common/devices/iPhone.png';

const FigmaPrototype = ({
  src,
  deviceFrameSrc = defaultDeviceFrame,
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
      <div className={styles.iframeContainer}>
        <iframe
          src={url}
          className={styles.prototype}
          title="Figma prototype "
          loading="lazy"
          seamless
        />
      </div>
      <Illustration
        src={deviceFrameSrc}
        className={styles.deviceFrame}
        alt="iPhone"
      />
    </div>
  );
};

FigmaPrototype.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  deviceFrameSrc: PropTypes.string,
};

export default FigmaPrototype;
