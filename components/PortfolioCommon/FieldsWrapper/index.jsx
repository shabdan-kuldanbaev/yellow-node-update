import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

export const FieldsWrapper = ({
  animated: { field },
  title,
  description,
  slug,
}) => {
  const { path, dynamicPath } = ROUTES.project.getRoute(slug);

  switch (field) {
  case 'title':
    return title && <h2 className={styles.h1}>{title}</h2>;
  case 'description':
    return description && <p className={styles.p}>{description}</p>;
  case 'link':
    return slug && (
      <LinkWrapper
        isLocalLink
        dynamicRouting={dynamicPath}
        path={path}
        className={styles.buttonWrap}
      >
        <button type="button">
          See full case study
        </button>
      </LinkWrapper>
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
