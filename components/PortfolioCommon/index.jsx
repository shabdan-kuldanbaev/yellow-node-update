import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withScroll } from 'hocs/withScroll';
import { DEFAULT_WORK_TYPE, ROUTES } from 'utils/constants';
import gaHelper from 'utils/ga';
import TypeSelector from './TypeSelector';
import TagsSelector from './TagsSelector';
import Work from './Work';
import { animatedProps, filterWorks } from './utils';
import styles from './styles.module.scss';
import { Animated } from '../Common/Animated';
import { CallToAction } from '../Common/CallToAction';

const Portfolio = ({
  works,
  maxScrollPosition,
}) => {
  const [worksDisplay, setWorksDisplay] = useState([]);
  const [selectedType, setSelectedType] = useState(DEFAULT_WORK_TYPE);
  const [selectedTags, setSelectedTags] = useState([]);

  const slugs = {
    Fireaway: 'fireaway',
    Fernwayer: 'fernwayer',
    Fairy: 'fairy',
    'Ubi.chat': 'ubi-chat',
    BibleMania: 'biblemania',
  };

  const onSelectedTypeChange = useCallback((type) => {
    if (type === selectedType) return;

    setSelectedType(type);
  }, [selectedType]);

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
      <Animated
        {...animatedProps}
        transitionDelay={550}
      >
        {/* <CallToAction */}
        {/*  type="card" */}
        {/*  title={link.linkTitle} */}
        {/*  buttonTitle={link.buttonTitle} */}
        {/*  handleOnClick={handleOnCTAClick} */}
        {/*  className={styles.callToAction} */}
        {/* /> */}
      </Animated>
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
