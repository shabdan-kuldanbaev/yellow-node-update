import React from 'react';
import { SectionTitle } from 'components/Common/SectionTitle';
import { connect } from 'react-redux';
import { selectTypes } from 'redux/selectors/portfolio';
import { DEFAULT_WORK_TYPE } from 'utils/constants';
import SelectorElement from '../SelectorElement';
import { SELECTOR_ELEMENT_TYPES } from '../SelectorElement/utils';
import styles from './styles.module.scss';

const TypeSelector = ({
  selectedType,
  onSelectedTypeChange,
  typeList,
}) => (
  <>
    <SectionTitle
      title="Types"
      containerStyle={styles.title}
    />

    <div className={styles.container}>
      {[DEFAULT_WORK_TYPE, ...typeList].map((type) => (
        <SelectorElement
          type={SELECTOR_ELEMENT_TYPES.typeSelector}
          displayName={type.displayName}
          onClick={() => onSelectedTypeChange(type)}
          selected={type === selectedType}
          className={styles.type}
          key={`WORK-TYPE/${type.slug}`}
        />
      ))}
    </div>
  </>
);

export default connect(
  (state) => ({ typeList: selectTypes(state) }),
)(TypeSelector);
