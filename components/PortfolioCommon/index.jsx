import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withScroll } from 'hocs/withScroll';
import {
  ANIMATED_TYPE,
  DEFAULT_WORK_TYPE,
  ROUTES,
} from 'utils/constants';
import gaHelper from 'utils/ga';
import TypeSelector from './TypeSelector';
import Work from './Work';
import { DEFAULT_WORKS_LIMIT, filterWorks } from './utils';
import styles from './styles.module.scss';
import { getLimitedList } from '../../utils/helper';
import ButtonMore from '../Common/ButtonMore';
import { Animated } from '../Common/Animated';

const Portfolio = ({
  works,
  maxScrollPosition,
}) => {
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [worksDisplay, setWorksDisplay] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_WORKS_LIMIT);
  const [selectedType, setSelectedType] = useState(DEFAULT_WORK_TYPE);
  const [selectedTag, setSelectedTag] = useState(null);

  const slugs = {
    Fireaway: 'fireaway',
    Fernwayer: 'fernwayer',
    Fairy: 'fairy',
    'Ubi.chat': 'ubi-chat',
    BibleMania: 'biblemania',
  };

  const isFilteringEnabled = filteredWorks.length !== works.length;
  const hasHiddenItems = !isFilteringEnabled && worksDisplay.length !== filteredWorks.length;

  const onSelectedTypeChange = useCallback((type) => {
    if (type === selectedType) return;

    setCurrentLimit(DEFAULT_WORKS_LIMIT);
    setSelectedType(type);
  }, [selectedType]);

  const onSelectedTagChange = useCallback((tag) => {
    setCurrentLimit(DEFAULT_WORKS_LIMIT);

    if (selectedTag && selectedTag.slug === tag.slug) {
      return setSelectedTag(null);
    }

    setSelectedTag(tag);
  }, [selectedTag]);

  const onShowMoreClick = useCallback(() => {
    setCurrentLimit((prev) => prev + DEFAULT_WORKS_LIMIT);
  }, []);

  useEffect(() => {
    if (!works.length) return;

    setFilteredWorks(filterWorks(works, { tag: selectedTag, workType: selectedType }));
  }, [selectedType, selectedTag, works]);

  useEffect(() => {
    if (isFilteringEnabled) {
      return setWorksDisplay(filteredWorks);
    }

    setWorksDisplay(getLimitedList(filteredWorks, { limit: currentLimit }));
  }, [isFilteringEnabled, currentLimit, filteredWorks]);

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
      <div className={styles.worksContainer}>
        {worksDisplay.map((work) => (
          <Work
            key={work.title}
            work={work}
            customSlug={slugs[work.title]}
            onTagClick={onSelectedTagChange}
            selectedTag={selectedTag}
          />
        ))}
      </div>
      {hasHiddenItems && (
        <Animated
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={250}
        >
          <ButtonMore
            title="See more projects"
            buttonStyle={styles.showMoreButton}
            handleOnClick={onShowMoreClick}
          />
        </Animated>
      )}
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
