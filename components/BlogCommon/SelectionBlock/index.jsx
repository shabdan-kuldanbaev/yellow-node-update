import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  ButtonMore,
  FullscreenSearch,
  FullscreenSubscribe,
} from 'components';
import cn from 'classnames';
import { setOverflowForBody } from 'utils/helper';
import { selectIsMobileCategotiesOpened } from 'redux/selectors/layout';
import { selectIsFirstVisit } from 'redux/selectors/blog';
import { setMobileCategoriesState } from 'redux/actions/layout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFirstVisit } from 'redux/actions/blog';
import styles from './styles.module.scss';
import SearchIcon from './images/search.svg';
import { tags } from './utils/data';
import Categories from './Categories';

const SelectionBlock = ({
  urlPath,
  isMobileCategoties,
  setMobileCategoriesState: setMobileCategories,
  isFirstVisitBlog,
  setFirstVisit: setFirstVisitOfBlog,
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
    if (!isFirstVisitBlog && subscribeRef.current && setFirstVisitOfBlog) {
      subscribeRef.current.classList.add(styles.buttonAppearsWithAnimation);
      // console.log('SelectionBlock !isFirstVisitBlog', isFirstVisitBlog);
      setFirstVisitOfBlog(true);
    } else if (isFirstVisitBlog && subscribeRef.current) {
      subscribeRef.current.classList.add(styles.buttonAddStyles);
      // console.log('SelectionBlock isFirstVisitBlog', isFirstVisitBlog);
    }
  }, []);

  // console.log('sb, isFirstVisitBlog', isFirstVisitBlog);
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
          buttonStyle={cn(styles.button, {
            // [styles.buttonAppears]: isFirstVisitBlog,
          })}
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
  isFirstVisitBlog: selectIsFirstVisit(state),
});

export default connect(mapStateToProps, { setMobileCategoriesState, setFirstVisit })(SelectionBlock);
