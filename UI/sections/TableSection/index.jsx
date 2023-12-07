import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';

import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Table = dynamic(() => import('components/Common/Table'));

const TableSection = (props) => {
  const {
    title,
    description,
    subtitle,
    view,
    type,
    tableContent,
    tableType,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.tableSection, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
        {tableContent && tableType && (
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <div className={styles.tableWrapper}>
              <Table
                tableData={tableContent.tableData}
                type={tableType}
              />
            </div>
          </Animated>
        )}
      </div>
    </section>
  );
};

TableSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default TableSection;
