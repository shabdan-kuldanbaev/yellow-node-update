import PropTypes from 'prop-types';
import Typography from 'UI/components/Typography';
import { FieldsWrapper } from 'UI/components/FieldsWrapper';
import { companyLinks } from '../utils/data';
import styles from './styles.module.scss';

const Company = ({ data = companyLinks }) => (
  <div className={styles.container}>
    <Typography
      variant="span"
      className={styles.title}
    >
      Company
    </Typography>
    {data && data.map(({
      path,
      subtitle,
      type,
    }) => (
      <FieldsWrapper
        key={path}
        type={type}
        path={path}
        subtitle={subtitle}
      />
    ))}
  </div>
);

Company.propTypes = {
  data: PropTypes.instanceOf(Array),
};

export default Company;
