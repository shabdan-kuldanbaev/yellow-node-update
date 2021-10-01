import React from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import tail from 'lodash/tail';
import { ARTICLE_TABLE_TYPES } from 'utils/constants';
import SimpleTableBody from './SimpleTableBody';
import SimpleTableHead from './SimpleTableHead';
import styles from './styles.module.scss';

export const Table = ({ tableData, tableType }) => {
  if (!tableData) {
    return null;
  }

  switch (tableType) {
  case ARTICLE_TABLE_TYPES.simpleTable:
    if (!tableData) {
      return null;
    }

    return (
      <table className={styles.table}>
        <SimpleTableBody tableData={tableData} />
      </table>
    );
  case ARTICLE_TABLE_TYPES.tableWithHeader:
    const tableHeader = head(tableData);
    const tableCells = tail(tableData);

    if (!tableHeader || !tableCells) {
      return null;
    }

    return (
      <table className={styles.table}>
        <SimpleTableHead tableHeader={tableHeader} />
        <SimpleTableBody tableData={tableCells} />
      </table>
    );
  case ARTICLE_TABLE_TYPES.tableWithTwoHeader:
    const tableFirstHeader = head(tableData);
    const tableCellsData = tail(tableData);

    if (!tableFirstHeader || !tableCellsData) {
      return null;
    }

    return (
      <table className={styles.table}>
        <SimpleTableHead tableHeader={tableFirstHeader} />
        <tbody>
          {tableCellsData && tableCellsData.map((row) => (
            <tr className={styles.tableRow}>
              {row.map((cell, index) => (index === 0
                ? (
                  <th className={styles.tableVerticalHeader}>
                    {cell}
                  </th>
                ) : (
                  <td className={styles.tableHeader}>
                    {cell}
                  </td>
                )))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  default:
    return null;
  }
};

Table.defaultProps = {
  tableType: ARTICLE_TABLE_TYPES.simpleTable,
};

Table.propTypes = {
  tableData: PropTypes.instanceOf(Object).isRequired,
  tableType: PropTypes.string,
};
