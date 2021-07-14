import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styles from './styles.module.scss';

export const Table = ({ tableData }) => {
  if (!tableData) {
    return null;
  }

  const tableHeader = get(tableData, '[0]', []);
  const tableCells = tableData.filter((data, index) => index !== 0);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <tr className={styles.tableRow}>
          {tableHeader && tableHeader.map((cell) => (
            <th className={styles.tableHeader}>
              {cell}
            </th>
          ))}
        </tr>
        {tableCells && tableCells.map((row) => (
          <tr className={styles.tableRow}>
            {row.map((cell) => (
              <td className={styles.tableHeader}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.instanceOf(Object).isRequired,
};
