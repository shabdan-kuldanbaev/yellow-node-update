import get from 'lodash/get';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({ data, type }) => {
  const {
    images,
    title,
    subtitle,
    description,
    view,
    ...rest
  } = data;

  const sectionTitles = {
    title,
    subtitle,
    description,
    titleStyle: styles.titleStyle,
  };

  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const subContent = get(data, 'contentModules[0]', {});
  const {
    contentList,
    imagesBundles,
  } = getDocumentFields(subContent, ['contentList', 'imagesBundles']);
  const className = cn(styles.parallaxSection, styles[type], styles[view]);
  const bundleImages = imagesBundles?.map((img) => getFileUrl(img));

  const parallaxElRef = useRef(null);
  const [bgPosition, setBgPosition] = useState(0);

  const height = parallaxElRef.current?.scrollHeight;
  const offset = parallaxElRef.current?.offsetTop;

  useEffect(() => {
    const scroll = window.scrollY;
    const win = window.innerHeight;

    const onScroll = () => {
      setBgPosition((100 * scroll) / (height + win) + (100 * (win - offset)) / (height + win));

      if (bgPosition > 100) {
        setBgPosition(100);
      } else if (bgPosition < 0) {
        setBgPosition(0);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  const paralaxProps = {
    ref: parallaxElRef,
    className: styles.parallaxImage,
    style: {
      backgroundImage: `url(${imageUrl})`,
      backgroundPositionY: `${bgPosition}%`,
    },
  };

  return {
    type,
    view,
    contentList,
    className,
    bundleImages,
    sectionTitles,
    paralaxProps,
    ...rest,
  };
};
