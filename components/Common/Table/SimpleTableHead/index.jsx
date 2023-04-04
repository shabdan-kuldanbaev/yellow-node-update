import PropTypes from 'prop-types';
import styles from 'components/Common/Table/styles.module.scss';

const SimpleTableHead = ({ tableHeader }) => {
  if (!tableHeader) {
    return null;
  }

  return (
    <thead>
      <tr className={styles.tableRow}>
        {tableHeader && tableHeader.map((cell) => (
          <th
            className={styles.tableHeader}
            scope="col"
          >
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  );
};

SimpleTableHead.propTypes = {
  tableHeader: PropTypes.instanceOf(Object).isRequired,
};

export default SimpleTableHead;
