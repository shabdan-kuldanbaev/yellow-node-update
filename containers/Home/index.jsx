import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pageReadyToDisplay } from 'redux/actions/layout';
import { selectImageCarousel, selectIsLoading } from 'redux/selectors/layout';
import {
  setDuck,
} from 'redux/actions/home';
// TODO import { Controller, Scene } from 'react-scrollmagic';
import {
  Intro,
  Blog,
  // TODO Advantages,
  Portfolio,
  ReviewsContainer,
  // TODO Insta,
  FeedbackFormContainer,
} from 'containers';
import { PhotoGallery, LoadingPage } from 'components';
import { getDocumentFields } from 'utils/helper';
import {
  DEFAULT_ARTICLES_LIMIT,
  PAGES,
} from 'utils/constants';
import {
  three,
} from 'components/HomeCommon/Duck/utils/threeHelper';


export const Home = ({
  theme,
  introSection,
  photosData,
  pageReadyToDisplay: fetchPage,
  isPageLoading,
  setDuck,
}) => {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);

  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  useEffect(() => {
    fetchPage({ slug: PAGES.homepage, currentLimit: DEFAULT_ARTICLES_LIMIT });
    three.loadModel(setDuck);
  }, []);

  // TODO
  // useEffect(() => {
  //   const handleOnScroll = () => {
  //     if (gradientRef && gradientRef.current) {
  //       if (window.pageYOffset > introSection.current.clientHeight) {
  //         gradientRef.current.style.position = 'relative';
  //         revealRef.current.style.position = 'absolute';
  //       } else {
  //         gradientRef.current.style.position = 'fixed';
  //         revealRef.current.style.position = 'initial';
  //       }
  //     }
  //   };

  //   handleOnScroll();
  //   window.addEventListener('scroll', handleOnScroll);

  //   return (() => window.removeEventListener('scroll', handleOnScroll));
  // });

  return (
    <Fragment>
      {/* TODO
        <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
        <Scene pin="#intro">
        </Scene>
        <Scene pin="#portfolio">
          <Portfolio gradientRef={gradientRef} />
        </Scene>
      </Controller> */}
      {
        !isAnimationEnded ? (
          <LoadingPage
            isLoading={isPageLoading}
            handleOnAnimationComplete={handleOnAnimationComplete}
          />
        ) : (
          <Fragment>
            <Intro theme={theme} introSection={introSection} isLoading={isPageLoading} />
            <Portfolio gradientRef={gradientRef} />
            {/* TODO <Advantages /> */}
            <ReviewsContainer />
            <Blog />
            {/* TODO <Insta /> */}
            {content && <PhotoGallery photos={content} />}
            <FeedbackFormContainer />
          </Fragment>
        )
      }
    </Fragment>
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  pageReadyToDisplay: PropTypes.func.isRequired,
  photosData: PropTypes.instanceOf(Object).isRequired,
  isPageLoading: PropTypes.bool.isRequired,
  setDuck: PropTypes.func.isRequired,
};

export default connect((state) => ({
  photosData: selectImageCarousel(state),
  isPageLoading: selectIsLoading(state),
}), { pageReadyToDisplay, setDuck })(Home);
