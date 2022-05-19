import React from 'react';
import { SectionTitle } from 'components/Common/SectionTitle';
import SelectorElement from '../SelectorElement';
import { SELECTOR_ELEMENT_TYPES } from '../SelectorElement/utils';
import { WORK_TYPES } from '../utils';
import styles from './styles.module.scss';

const TypeSelector = ({ selectedType, onSelectedTypeChange }) => (
  <>
    <SectionTitle
      title="Types"
      containerStyle={styles.title}
    />

    <div className={styles.container}>
      {Object.entries(WORK_TYPES).map(([typeSlug, typeName]) => (
        <SelectorElement
          type={SELECTOR_ELEMENT_TYPES.typeSelector}
          displayName={typeName}
          onClick={() => onSelectedTypeChange(typeSlug)}
          selected={WORK_TYPES[typeSlug] === selectedType}
        />
      ))}
    </div>
  </>
);

export default TypeSelector;
