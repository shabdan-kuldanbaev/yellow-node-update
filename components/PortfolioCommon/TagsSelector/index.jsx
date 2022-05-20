import React from 'react';
import { connect } from 'react-redux';
import { selectTags } from 'redux/selectors/portfolio';
import { SectionTitle } from 'components/Common/SectionTitle';
import SelectorElement from '../SelectorElement';
import { SELECTOR_ELEMENT_TYPES } from '../SelectorElement/utils';
import styles from './styles.module.scss';

const TagsSelector = ({ selectedTags, onSelectionChange, tagList }) => (
  <>
    <SectionTitle
      title="Tags"
      containerStyle={styles.title}
    />

    <div className={styles.container}>
      {tagList.map((tag) => (
        <SelectorElement
          type={SELECTOR_ELEMENT_TYPES.tagSelector}
          displayName={tag.displayName}
          onClick={() => onSelectionChange(tag)}
          selected={selectedTags.includes(tag)}
        />
      ))}
    </div>
  </>
);

export default connect(
  (state) => ({ tagList: selectTags(state) }),
)(TagsSelector);
