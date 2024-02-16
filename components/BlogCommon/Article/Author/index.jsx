import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from './styles.module.scss';

export const Author = ({
  author: {
    avatarImage,
    fullName,
    position,
    slug,
  },
}) => (avatarImage && fullName && position) && (
  slug ? (
    <LinkWrapper
      path={`/person/${slug}`}
      className={styles.author}
    >
      <>
        <div
          style={{ backgroundImage: `url(${avatarImage})` }}
          className={styles.avatar}
        />
        <div className={styles.authorInfo}>
          <p>{fullName}</p>
          <span>{position}</span>
        </div>
      </>
    </LinkWrapper>
  ) : (
    <div className={styles.author}>
      <div
        style={{ backgroundImage: `url(${avatarImage})` }}
        className={styles.avatar}
      />
      <div className={styles.authorInfo}>
        <p>{fullName}</p>
        <span>{position}</span>
      </div>
    </div>
  )
);

Author.defaultProps = {
  author: {
    avatarImage: '',
    fullName: '',
    position: '',
  },
};

Author.propTypes = {
  author: PropTypes.shape({
    avatarImage: PropTypes.string,
    fullName: PropTypes.string,
    position: PropTypes.string,
  }),
};
