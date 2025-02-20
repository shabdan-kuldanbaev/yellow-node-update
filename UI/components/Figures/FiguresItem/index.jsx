import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Typography from 'UI/components/Typography';
import styles from 'UI/components/Figures/styles.module.scss';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import useFiguresItemProps from './utils/useFiguresItemProps';

const Svg = dynamic(() => import('UI/components/Svg'));

const FiguresItem = (props) => {
  const {
    icon,
    title,
    description,
  } = useFiguresItemProps(props);

  return (
    <div className={styles.figureItem}>
      {icon && (
        <Svg
          className={styles.icon}
          type={icon}
        />
      )}
      <Typography
        variant={TYPOGRAPHY_TAGS.span}
        size={TYPOGRAPHY_SIZE.headline38}
        className={styles.title}
        isBold
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant={TYPOGRAPHY_TAGS.span}
          size={TYPOGRAPHY_SIZE.paragrapgh16}
          className={styles.description}
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

FiguresItem.propTypes = {
  type: PropTypes.string.isRequired,
  figureData: PropTypes.instanceOf(Object).isRequired,
};

export default FiguresItem;
