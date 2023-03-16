import PropTypes from 'prop-types';
import ButtonMore from 'components/Common/ButtonMore';
import styles from './styles.module.scss';

export const FieldsWrapper = ({
  animated: { field },
  title,
  description,
  slug,
}) => {
  switch (field) {
  case 'title':
    return (
      <h2 className={styles.h2}>
        {title}
      </h2>
    );
  case 'description':
    return (
      <>
        <p className={styles.p}>
          {description}
        </p>
        <ButtonMore
          href={slug}
          title="View case"
          buttonStyle={styles.viewButton}
        />
      </>
    );
  default:
    return null;
  }
};

FieldsWrapper.defaultProps = {
  slug: '',
};

FieldsWrapper.propTypes = {
  animated: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
};
