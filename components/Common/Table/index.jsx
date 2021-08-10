import React from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import tail from 'lodash/tail';
import styles from './styles.module.scss';

export const Table = ({ tableData }) => {
  const tableHeader = head(tableData);
  const tableCells = tail(tableData);

  if (!tableHeader || !tableCells) {
    return null;
  }

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
