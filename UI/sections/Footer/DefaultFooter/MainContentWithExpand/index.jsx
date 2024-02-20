import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Typography from 'UI/components/Typography';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { FieldsWrapper } from 'UI/components/FieldsWrapper';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));
const Animated = dynamic(() => import('UI/containers/Animated'));

const MainContentWithExpand = (props) => {
  const {
    footerLinksData,
    handleClick,
    activeIndex,
  } = useProps(props);

  return (
    <div className={styles.mainContent}>
      {footerLinksData?.map(({
        title,
        links,
        type,
      }, index) => (
        <div
          key={`footer/${type}`}
          className={styles.container}
        >
          <Typography
            variant="span"
            className={cn(
              styles.title,
              { [styles.active]: index === activeIndex },
            )}
            onClick={handleClick(index)}
          >
            <span>{title}</span>
            <Svg type={SVG_IMAGES_TYPES.arrowDown} />
          </Typography>
          <Animated
            open={index === activeIndex}
            type={ANIMATED_TYPE.expandByHeight}
          >
            <div className={styles.links}>
              {links && links?.map(({
                path,
                subtitle,
                type: linkType,
              }) => (
                <FieldsWrapper
                  key={path}
                  type={linkType}
                  path={path}
                  subtitle={subtitle}
                />
              ))}
            </div>
          </Animated>
        </div>
      ))}
    </div>
  );
};

MainContentWithExpand.propTypes = {
  mainContent: PropTypes.instanceOf(Array),
};

export default MainContentWithExpand;
