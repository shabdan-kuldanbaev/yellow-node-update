import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import FiguresItem from './FiguresItem';
import useFiguresProps from './utils/useFiguresProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

export const Figures = (props) => {
  const {
    text,
    type,
    figures,
    figuresData,
  } = useFiguresProps(props);

  if (!figuresData) return null;

  return (
    <div className={styles[type]}>
      {text && (
        <div className={styles.text}>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <ContentfulParser document={text} />
          </Animated>
        </div>
      )}
      <div className={styles.figures}>
        {figures?.map((item, index) => (
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50 * index}
            key={`page-intro-figures/${index}`}
          >
            <FiguresItem
              type={type}
              figureData={item}
            />
          </Animated>
        ))}
      </div>
    </div>
  );
};

Figures.propTypes = {
  figuresData: PropTypes.instanceOf(Object),
  type: PropTypes.string.isRequired,
};
