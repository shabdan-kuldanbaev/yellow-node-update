import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/common/Table/styles.module.scss';

const SimpleTableBody = ({ tableData }) => {
  if (!tableData) {
    return null;
  }

  return (
    <tbody>
      {tableData.map((row) => (
        <tr className={styles.tableRow}>
          {row.map((cell) => (
            <td className={styles.tableHeader}>
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

SimpleTableBody.propTypes = {
  tableData: PropTypes.instanceOf(Object).isRequired,
};

export default SimpleTableBody;
