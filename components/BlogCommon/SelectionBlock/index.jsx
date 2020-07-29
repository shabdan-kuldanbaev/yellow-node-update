import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsBlogOpen, selectIsFirstVisit } from 'redux/selectors/blog';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
import { setMobileCategoriesState } from 'redux/actions/layout';
import { setFirstVisit } from 'redux/actions/blog';
import {
  ButtonMore,
  FullscreenSearch,
  FullscreenSubscribe,
} from 'components';
import { setOverflowForBody } from 'utils/helper';
import Categories from './Categories';
import SearchIcon from './images/search.svg';
import { tags } from './utils/data';
import styles from './styles.module.scss';

const SelectionBlock = ({
  urlPath,
  isMobileCategoties,
  setMobileCategoriesState: setMobileCategories,
  isBlogOpen,
  isFirstVisitBlog,
  setFirstVisit: setFirstVisitOfBlog, // TODO
}) => {
  const [isFullscreenSearch, setFullscreenSearch] = useState(false);
  const [isFullscreenSubscribe, setFullscreenSubscribe] = useState(false);
  const subscribeRef = useRef(null);

  const openFullscreenSearch = () => setFullscreenSearch(true);
  const closeFullscreenSearch = () => setFullscreenSearch(false);
  const openFullscreenSubscribe = () => setFullscreenSubscribe(true);
  const closeFullscreenSubscribe = () => setFullscreenSubscribe(false);
  const openMobileCategoties = () => setMobileCategories(true);
  const closeMobileCategoties = () => setMobileCategories(false);

  useEffect(() => {
    setOverflowForBody(isMobileCategoties);
  }, [isMobileCategoties]);

  useEffect(() => {
    if (!isFirstVisitBlog && isBlogOpen) {
      subscribeRef.current && subscribeRef.current.classList.add(styles.buttonAppearsWithAnimation);
      // TODO setFirstVisitOfBlog(true);
    } else if (isFirstVisitBlog) {
      subscribeRef.current && subscribeRef.current.classList.add(styles.buttonAddStyles);
    }
  }, [isBlogOpen]);

  return (
    <div className={cn(styles.selectionBlock, { [styles.showCategories]: isMobileCategoties })}>
      <Categories
        tags={tags}
        urlPath={urlPath}
        isMobileCategoties={isMobileCategoties}
        closeMobileCategoties={closeMobileCategoties}
      />
      {isMobileCategoties && <div className={styles.darkBackground} />}
      <div className={styles.buttons}>
        <img
          src={SearchIcon}
          alt="Search"
          onClick={openFullscreenSearch}
        />
        <ButtonMore
          buttonRef={subscribeRef}
          handleOnClick={openFullscreenSubscribe}
          title="Subscribe"
          buttonStyle={styles.button}
        />
        <span className={styles.categoryTitleInHeader} onClick={openMobileCategoties}>Categories</span>
      </div>
      <FullscreenSearch isFullscreenSearch={isFullscreenSearch} closeFullscreenSearch={closeFullscreenSearch} />
      <FullscreenSubscribe isFullscreenSubscribe={isFullscreenSubscribe} closeFullscreenSubscribe={closeFullscreenSubscribe} />
    </div>
  );
};

SelectionBlock.propTypes = {
  urlPath: PropTypes.string.isRequired,
  isMobileCategoties: PropTypes.bool.isRequired,
  setMobileCategoriesState: PropTypes.func.isRequired,
  isFirstVisitBlog: PropTypes.bool.isRequired,
  setFirstVisit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isMobileCategoties: selectIsMobileCategotiesOpened(state),
  isBlogOpen: selectIsBlogOpen(state),
  isFirstVisitBlog: selectIsFirstVisit(state),
});

export default connect(mapStateToProps, { setMobileCategoriesState, setFirstVisit })(SelectionBlock);
