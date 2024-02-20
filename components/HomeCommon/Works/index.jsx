import PropTypes from 'prop-types';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import Work from './Work';
import styles from './styles.module.scss';

const Works = ({ refs, works = [] }) => (
  <div className={styles.worksContainer}>
    {works?.map((work, index) => {
      const {
        previewImage,
        title,
        description,
        slug,
      } = getDocumentFields(
        work,
        ['previewImage', 'title', 'description', 'slug'],
      );

      const imageUrl = getFileUrl(previewImage);

      return (
        <Work
          key={title}
          ref={refs.current[index]}
          index={index}
          title={title}
          description={description}
          imageUrl={imageUrl}
          slug={slug}
        />
      );
    })}
  </div>
);

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array),
};

export default Works;
