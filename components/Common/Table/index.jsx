import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import FullLayout from 'components/Layout/FullLayout';
import { ARTICLE_TABLE_TYPES } from 'utils/constants';
import { TableContent } from './TableContent';
import styles from './styles.module.scss';

const Table = ({
  tableData,
  type,
  isMobileResolution,
}) => {
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
  isMobileResolution: false,
};

Table.propTypes = {
  tableData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  isMobileResolution: PropTypes.bool,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Table);
