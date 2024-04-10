import PropTypes from 'prop-types';
import styles from 'components/Common/Table/styles.module.scss';

const SimpleTableBody = ({ tableData }) => {
  if (!tableData) {
    return null;
  }

  return (
    <tbody>
      {tableData.map((row, rowIndex) => (
        <tr
          key={`row_key_${rowIndex + 1}`}
          className={styles.tableRow}
        >
          {row.map((cell, cellIndex) => (
            <td
              key={`cell_key_${cellIndex + 1}`}
              className={styles.tableHeader}
            >
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
