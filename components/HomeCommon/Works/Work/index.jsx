import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Button from 'UI/components/Button';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'UI/components/SectionTitle';
import { routes } from 'utils/routes';
import { darkButtons, transparentImages } from './utils';
import styles from './styles.module.scss';

const Work = forwardRef(({
  index,
  imageUrl,
  title,
  description,
  slug,
}, ref) => (
  <div
    className={styles.work}
    key={`works/${title}`}
    data-index={index}
    ref={ref}
  >
    <div className={styles.contentContainer}>
      <SectionTitle
        title={title}
        description={description}
        className={styles.content}
      />
      <Button
        href={routes.project.getRoute(slug).path}
        className={styles.link}
        secondary
        dark={darkButtons.includes(slug)}
      >
        View Case
      </Button>
    </div>

    <Illustration
      src={imageUrl}
      className={styles.image}
      transparent={transparentImages.includes(slug)}
    />
  </div>
));

Work.propTypes = {
  index: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
};

export default Work;
