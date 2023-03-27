import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'redux/selectors/layout';
import FullLayout from 'components/Layout/FullLayout';
import { ARTICLE_TABLE_TYPES } from 'utils/constants';
import { TableContent } from './TableContent';
import styles from './styles.module.scss';

const Table = ({
  tableData,
  type,
}) => {
  const isMobileResolution = useSelector(selectIsMobile);

  if (!tableData) {
    return null;
  }

  return isMobileResolution
    ? (
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <div className={styles.tableContainer}>
          <TableContent
            tableData={tableData}
            type={type}
          />
        </div>
      </FullLayout>
    )
    : (
      <TableContent
        tableData={tableData}
        type={type}
      />
    );
};

Table.defaultProps = {
  type: ARTICLE_TABLE_TYPES.simpleTable,
};

Table.propTypes = {
  tableData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default Table;
