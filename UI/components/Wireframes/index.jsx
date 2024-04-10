import cn from 'classnames';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useWireframes } from './utils/useWireframes';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Wireframe = (props) => {
  const {
    type,
    wireframeImages,
  } = useWireframes(props);

  if (!wireframeImages) {
    return null;
  }

  return wireframeImages?.map(({
    url,
    alt,
    height,
    width,
  }) => (
    <Animated
      key={url}
      delay={100}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={cn(styles[type], styles.container)}>
        <Illustration
          src={url}
          alt={alt}
          layout="responsive"
          style={{
            minWidth: `${width}px`,
            height: `${height}px`,
          }}
          width={width}
          height={height}
          containerClasses={styles.animatedContainer}
          className={styles.image}
          unoptimized
        />
        <Illustration
          src={url}
          alt={alt}
          layout="responsive"
          style={{
            minWidth: `${width}px`,
            height: `${height}px`,
          }}
          width={width}
          height={height}
          containerClasses={styles.animatedContainer}
          className={styles.image}
          unoptimized
        />
      </div>
    </Animated>
  ));
};

export default Wireframe;
