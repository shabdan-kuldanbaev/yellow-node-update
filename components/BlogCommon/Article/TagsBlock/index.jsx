import PropTypes from 'prop-types';
import { ROUTES } from 'utils/constants';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from './styles.module.scss';

export const TagsBlock = ({ tags }) => {
  if (!tags) {
    return null;
  }

  return (
    <div className={styles.tagsBlock}>
      <span className={styles.title}>
        Tags
      </span>
      <div className={styles.tagsList}>
        {tags.map(({ title, slug }) => (
          <LinkWrapper
            key={title}
            path={ROUTES.blog.getRoute(slug).path}
            className={styles.tag}
          >
            {title}
          </LinkWrapper>
        ))}
      </div>
    </div>
  );
};

TagsBlock.defaultProps = {
  tags: [],
};

TagsBlock.propTypes = {
  tags: PropTypes.instanceOf(Array),
};
