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
import { loadDuck } from 'components/HomeCommon/DuckContainer/utils/threeHelper';
import MetaTags from 'components/Common/MetaTags';
import Portfolio from 'containers/Home/Portfolio';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { AppContext } from 'utils/appContext';

const ReviewsContainer = dynamic(() => import('containers/Home/Reviews'));
const Blog = dynamic(() => import('containers/Home/Blog'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const FeedbackFormContainer = dynamic(() => import('containers/Home/FeedbackForm'));

export const Home = ({
  theme,
  introSection,
}) => {
  const photosData = useSelector(selectImageCarousel);
  const metaData = useSelector(selectMetaData);

  const gradientRef = useRef(null);
  const { contentModules } = getDocumentFields(photosData, ['contentModules']);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}`,
  };

  return (
    <Fragment>
      <MetaTags
        page={PAGES.homepage}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.homepage()}
      />
      <Intro
        theme={theme}
        introSection={introSection}
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
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};

export default Home;
