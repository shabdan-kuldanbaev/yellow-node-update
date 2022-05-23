import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { withScroll } from 'hocs/withScroll';
import { ROUTES } from 'utils/constants';
import gaHelper from 'utils/ga';
import { filterWorks, WORK_TYPES } from './utils';
import styles from './styles.module.scss';
import TypeSelector from './TypeSelector';
import TagsSelector from './TagsSelector';
import Work from './Work';

const Portfolio = ({
  works,
  maxScrollPosition,
}) => {
  const [worksDisplay, setWorksDisplay] = useState([]);
  const [selectedType, setSelectedType] = useState(WORK_TYPES.all);
  const [selectedTags, setSelectedTags] = useState([]);

  const slugs = {
    Fernwayer: 'fernwayer',
    Fairy: 'fairy',
  };

  const onSelectedTypeChange = useCallback((type) => {
    setSelectedType(WORK_TYPES[type]);
  }, []);

  const onSelectedTagsChange = useCallback((tag) => {
    if (selectedTags.includes(tag)) {
      return setSelectedTags((prev) => prev.filter((selectedTag) => selectedTag !== tag));
    }

    setSelectedTags((prev) => [...prev, tag]);
  }, [selectedTags]);

  useEffect(() => {
    if (!works.length) return;

    setWorksDisplay(filterWorks(works, { tags: selectedTags, workType: selectedType }));
  }, [selectedType, selectedTags, works]);

  useEffect(() => () => {
    gaHelper.trackEvent(
      'Scroll',
      `${maxScrollPosition.current}%`,
      ROUTES.portfolio.path,
      maxScrollPosition.current < 50,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return works && (
    <>
      <TypeSelector
        selectedType={selectedType}
        onSelectedTypeChange={onSelectedTypeChange}
      />
      <TagsSelector
        selectedTags={selectedTags}
        onSelectionChange={onSelectedTagsChange}
      />
      <div className={styles.worksContainer}>
        {worksDisplay.map((work) => (
          <Work
            key={work.title}
            work={work}
            customSlug={slugs[work.title]}
          />
        ))}
      </div>
    </>
  );
};

Portfolio.defaultProps = {
  works: [],
};

Portfolio.propTypes = {
  works: PropTypes.instanceOf(Array),
  maxScrollPosition: PropTypes.instanceOf(Object).isRequired,
};

export default withScroll(Portfolio);
