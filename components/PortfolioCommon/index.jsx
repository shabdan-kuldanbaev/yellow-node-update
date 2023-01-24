import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import withScroll from 'hocs/withScroll';
import Animated from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import {
  DEFAULT_WORK_TYPE,
  REVEAL_ANIMATION_PROPS,
  ROUTES,
} from 'utils/constants';
import gaHelper from 'utils/ga';
import { getLimitedList } from 'utils/helper';
import { useSelector } from 'react-redux';
import { selectTypes } from 'redux/selectors/portfolio';
import Work from './Work';
import { DEFAULT_WORKS_LIMIT, filterWorks } from './utils';
import styles from './styles.module.scss';

const TypeSelector = dynamic(() => import('../TypeSelector'));

const Portfolio = ({
  works,
  maxScrollPosition,
}) => {
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [worksDisplay, setWorksDisplay] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_WORKS_LIMIT);
  const [selectedType, setSelectedType] = useState(DEFAULT_WORK_TYPE);
  const [selectedTag, setSelectedTag] = useState(null);

  const typeList = useSelector(selectTypes);

  const slugs = {
    Fireaway: 'fireaway',
    Fernwayer: 'fernwayer',
    Fairy: 'fairy',
    'Ubi.chat': 'ubi-chat',
    BibleMania: 'biblemania',
  };

  const isFilteringEnabled = works && filteredWorks.length !== works.length;
  const hasHiddenItems = !isFilteringEnabled && worksDisplay.length !== filteredWorks.length;

  const onSelectedTypeChange = useCallback((type) => {
    if (type === selectedType) return;

    setCurrentLimit(DEFAULT_WORKS_LIMIT);
    setSelectedType(type);
  }, [selectedType]);

  const onSelectedTagChange = useCallback((tag) => {
    setCurrentLimit(DEFAULT_WORKS_LIMIT);

    if (selectedTag?.slug === tag.slug) {
      return setSelectedTag(null);
    }

    setSelectedTag(tag);
  }, [selectedTag]);

  const onShowMoreClick = useCallback(() => {
    setCurrentLimit((prev) => prev + DEFAULT_WORKS_LIMIT);
  }, []);

  useEffect(() => {
    if (!works || !works.length) return;

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
        typeList={typeList}
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
        <Animated {...REVEAL_ANIMATION_PROPS}>
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
