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
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          {tableHeader && tableHeader.map((cell) => (
            <th className={styles.tableHeader}>
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableCells && tableCells.map((row) => (
          <tr className={styles.tableRow}>
            {row.map((cell) => (
              <td className={styles.tableHeader}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  tableData: PropTypes.instanceOf(Object).isRequired,
};
