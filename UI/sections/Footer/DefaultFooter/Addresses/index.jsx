import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'UI/components/Typography';
import { FieldsWrapper } from '../MainContent/FieldsWrapper';
import { addresses } from '../utils/data';
import styles from './styles.module.scss';

const Addresses = ({ addresses: links }) => (
  <div className={styles.container}>
    <Typography
      variant="p"
      className={styles.blockTitle}
    >
      Find us
    </Typography>
    {links?.map(({
      title,
      text,
      path,
      pathText,
      type,
    }) => (
      <div key={title}>
        <Typography className={styles.addressTitle}>
          {title}
        </Typography>
        {text
          && (
            <Typography className={styles.addressText}>
              {text}
            </Typography>
          )}
        {path
          && (
            <FieldsWrapper
              type={type}
              path={path}
              subtitle={pathText}
            />
          )}
      </div>
    ))}
  </div>
);

Addresses.defaultProps = {
  addresses,
};

Addresses.propTypes = {
  addresses: PropTypes.instanceOf(Array),
};

export default Addresses;
