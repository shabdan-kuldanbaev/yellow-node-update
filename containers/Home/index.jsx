import React, {
  Fragment,
  useEffect,
  useRef,
  useContext,
} from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDuck } from 'redux/actions/home';
import {
  selectImageCarousel,
  selectIsPageReadyToDisplay,
  selectMetaData,
} from 'redux/selectors/layout';
import { selectDuck } from 'redux/selectors/home';
import Intro from 'containers/Home/Intro';
import FullLayout from 'components/Layout/FullLayout';
import { loadDuck } from 'components/HomeCommon/Duck/utils/threeHelper';
import MetaTags from 'components/Common/MetaTags';
import Portfolio from 'containers/Home/Portfolio';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { AppContext } from 'utils/appContext';
import LoadingPlaceholder from './LoadingPlaceholder';

const ReviewsContainer = dynamic(() => import('containers/Home/Reviews'));
const Blog = dynamic(() => import('containers/Home/Blog'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const FeedbackFormContainer = dynamic(() => import('containers/Home/FeedbackForm'));

export const Home = ({
  theme,
  introSection,
}) => {
  const dispatch = useDispatch();
  const photosData = useSelector(selectImageCarousel);
  const isPageReadyToDisplay = useSelector(selectIsPageReadyToDisplay);
  const duck = useSelector(selectDuck);
  const metaData = useSelector(selectMetaData);

  const gradientRef = useRef(null);
  const { contentModules } = getDocumentFields(photosData, ['contentModules']);
  const { contextData, setContextData } = useContext(AppContext);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}`,
  };

  useEffect(() => {
    if (!duck) {
      dispatch(fetchDuck({
        isFirstHomepageVisit: contextData.isFirstHomepageVisit,
        loadDuck,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duck]);

  useEffect(() => () => {
    if (!contextData.isHomepageVisit) {
      setContextData({
        ...contextData,
        isFirstHomepageVisit: true,
        isHomepageVisit: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <MetaTags
        page={PAGES.homepage}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.homepage()}
      />
      {(!isPageReadyToDisplay || !duck) ? <LoadingPlaceholder /> : (
        <Fragment>
          <Intro
            theme={theme}
            introSection={introSection}
            duck={duck}
          />
          {Portfolio && <Portfolio gradientRef={gradientRef} />}
          {/* // TODO wrap all page in full layout */}
          <FullLayout
            disableTopPadding
            disableBottomPadding
          >
            <ReviewsContainer />
            <Blog />
            <FullLayout
              disableMaxWidth
              disableTopPadding
              disableSidePadding
              disableBottomPadding
            >
              <PhotoGallery photos={contentModules} />
            </FullLayout>
            <FeedbackFormContainer />
          </FullLayout>
        </Fragment>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};

export default Home;
